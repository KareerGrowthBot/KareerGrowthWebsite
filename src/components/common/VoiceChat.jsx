"use client";

import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDeepgram } from "../../context/DeepgramContextProvider.jsx";
import { useMicrophone } from "../../context/MicrophoneContextProvider.jsx";
import { useVoiceBot, VoiceBotStatus } from "../../context/VoiceBotContextProvider.jsx";
import { sendMicToSocket, sendSocketMessage } from "../../utils/deepgramUtils";
import { createAudioBuffer, playAudioBuffer, convertFloat32ToInt16, downsample } from "../../utils/audioUtils";

const defaultStsConfig = {
    type: "Settings",
    audio: {
        input: { encoding: "linear16", sample_rate: 16000 },
        output: { encoding: "linear16", sample_rate: 24000, container: "none" },
    },
    agent: {
        listen: { provider: { type: "deepgram", model: "nova-3" } },
        speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
        think: {
            provider: { type: "open_ai", model: "gpt-4o" },
            prompt: `You are a helpful AI voice assistant for KareerGrowth. Answer questions concisely and helpfully about career growth, interviews, and professional development.
            
            ## Navigation Instructions
            You can help users navigate to different pages on the website.
            Available pages:
            - **Home**: "/" (route: "home")
            - **Stories**: "/stories" (route: "stories")
            - **Blog**: "/blog" (route: "blog")
            - **Contact**: "/contact" (route: "contact")
            
            When a user asks to go to, open, or show a page:
            1. Describe the page briefly (max 1 sentence).
            2. Ask for explicit permission: "Would you like me to take you there?".
            3. ONLY use the 'navigate_to_page' function if the user says "Yes" or confirms.
            `,
            functions: [
                {
                    name: "navigate_to_page",
                    description: "Navigate to a specific page on the KareerGrowth website.",
                    parameters: {
                        type: "object",
                        properties: {
                            page: {
                                type: "string",
                                description: "The page to navigate to.",
                                enum: ["home", "stories", "blog", "contact"],
                            },
                        },
                        required: ["page"],
                    },
                },
            ],
        },
    },
    experimental: true,
};

const VoiceChat = () => {
    const navigate = useNavigate();
    const { status, startListening, startSpeaking, addVoicebotMessage, isWaitingForUserVoiceAfterSleep, toggleSleep } = useVoiceBot();
    const { setupMicrophone, microphone, microphoneState, processor, microphoneAudioContext, startMicrophone } = useMicrophone();
    const { socket, connectToDeepgram, disconnectFromDeepgram, socketState, rateLimited } = useDeepgram();

    const [isInitialized, setIsInitialized] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const audioContext = useRef(null);
    const agentVoiceAnalyser = useRef(null);
    const userVoiceAnalyser = useRef(null);
    const startTimeRef = useRef(-1);
    const scheduledAudioSources = useRef([]);
    const settingsSent = useRef(false);
    const isWakingUp = useRef(false);
    const pendingNavigation = useRef(null);

    useEffect(() => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
            agentVoiceAnalyser.current = audioContext.current.createAnalyser();
            agentVoiceAnalyser.current.fftSize = 256;
        }
    }, []);

    const clearAudioBuffer = () => {
        scheduledAudioSources.current.forEach(s => s.stop());
        scheduledAudioSources.current = [];
    };

    const performNavigation = (route) => {
        console.log(`[Navigation] Setting pending route to ${route}`);
        pendingNavigation.current = route;
    };

    useEffect(() => {
        if ((microphoneState === 1 || microphoneState === 2) && socket && socketState === 1) {
            if (!settingsSent.current) {
                sendSocketMessage(socket, defaultStsConfig);
                settingsSent.current = true;
                if (microphoneState === 1) startMicrophone();
                startListening(true);
            }
        }
    }, [microphoneState, socket, socketState, startMicrophone, startListening]);

    useEffect(() => {
        if (microphoneState === 2 && socketState === 1 && processor) {
            if (processor.type === 'worklet' && processor.workletNode) {
                processor.workletNode.port.onmessage = (e) => {
                    if (status !== VoiceBotStatus.SLEEPING && socket.readyState === 1) {
                        const downsampled = downsample(e.data.audioData, 48000, 16000);
                        socket.send(convertFloat32ToInt16(downsampled));
                    }
                };
            } else {
                processor.onaudioprocess = sendMicToSocket(socket);
            }
        }
    }, [microphoneState, socketState, processor, status, socket]);

    useEffect(() => {
        if (!socket) return;
        const onMessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                if (status !== VoiceBotStatus.SLEEPING && !isWaitingForUserVoiceAfterSleep.current) {
                    const buffer = createAudioBuffer(audioContext.current, event.data);
                    scheduledAudioSources.current.push(playAudioBuffer(audioContext.current, buffer, startTimeRef, agentVoiceAnalyser.current));
                }
            } else {
                try {
                    const parsed = JSON.parse(event.data);
                    if (parsed.role === "user") addVoicebotMessage({ user: parsed.content });
                    if (parsed.role === "assistant") {
                        addVoicebotMessage({ assistant: parsed.content });
                        startSpeaking();

                        // Handle function calls
                        if (parsed.function_call || parsed.function_calls) {
                            const calls = parsed.function_calls || [parsed.function_call];
                            calls.forEach(call => {
                                if (call.name === "navigate_to_page") {
                                    const args = typeof call.arguments === 'string' ? JSON.parse(call.arguments) : call.arguments;
                                    const routes = { home: "/", stories: "/stories", blog: "/blog", contact: "/contact" };
                                    if (routes[args.page]) performNavigation(routes[args.page]);
                                }
                            });
                        }

                        // Content-based fallback
                        const content = parsed.content?.toLowerCase() || "";
                        if (/(?:navigat|taking|opening|going to|showing you)/i.test(content)) {
                            if (content.includes("stories")) performNavigation("/stories");
                            else if (content.includes("blog")) performNavigation("/blog");
                            else if (content.includes("contact")) performNavigation("/contact");
                            else if (content.includes("home")) performNavigation("/");
                        }
                    }
                    if (parsed.type === "AgentAudioDone") {
                        if (pendingNavigation.current) {
                            const route = pendingNavigation.current;
                            pendingNavigation.current = null;
                            setTimeout(() => {
                                navigate(route);
                            }, 500);
                        }
                        startListening();
                    }
                    if (parsed.type === "UserStartedSpeaking") {
                        isWaitingForUserVoiceAfterSleep.current = false;
                        clearAudioBuffer();
                        startListening();
                    }
                } catch (e) { }
            }
        };
        socket.addEventListener("message", onMessage);
        return () => socket.removeEventListener("message", onMessage);
    }, [socket, status, addVoicebotMessage, startSpeaking, startListening, isWaitingForUserVoiceAfterSleep, navigate]);

    const handleVoiceBotAction = () => {
        if (!isInitialized) {
            setIsInitialized(true);
            setupMicrophone();
            connectToDeepgram();
            return;
        }
        if (status !== VoiceBotStatus.SLEEPING) {
            clearAudioBuffer();
            disconnectFromDeepgram();
            toggleSleep();
            settingsSent.current = false;
        } else {
            isWakingUp.current = true;
            toggleSleep();
            connectToDeepgram();
        }
    };

    if (rateLimited) return null;

    const isActive = socketState === 1 && status !== VoiceBotStatus.SLEEPING;

    return (
        <div className="voice-chat-container">
            <div className="voice-chat-animation-container">
                <motion.div
                    className="click-to-talk-button-wrapper"
                    onClick={handleVoiceBotAction}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={isActive ? "/images/closetoend.png" : "/images/talktome.png"} alt="Toggle" className="click-to-talk-image" />
                </motion.div>
                <button
                    onClick={() => { setIsRotating(!isRotating); handleVoiceBotAction(); }}
                    className="deepgram-orb-button"
                >
                    <img
                        src="/images/ai-bot.png"
                        alt="Bot"
                        style={{ animation: isRotating ? 'rotateCounterClockwise 3s linear infinite' : 'none' }}
                    />
                </button>
            </div>
        </div>
    );
};

export default VoiceChat;

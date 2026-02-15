"use client";

import { createContext, useCallback, useContext, useState } from "react";

const MicrophoneContext = createContext();

const MicrophoneContextProvider = ({ children }) => {
    const [microphoneState, setMicrophoneState] = useState(null);
    const [microphone, setMicrophone] = useState();
    const [microphoneAudioContext, setMicrophoneAudioContext] = useState();
    const [processor, setProcessor] = useState();

    const setupMicrophone = async () => {
        setMicrophoneState(0);

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("getUserMedia is not supported in this browser");
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    volume: 1.0,
                    echoCancellation: true,
                    noiseSuppression: false,
                    latency: 0,
                },
            });

            const audioContext = new AudioContext({ sampleRate: 48000 });
            const source = audioContext.createMediaStreamSource(stream);

            let processor;
            let workletNode;

            try {
                await audioContext.audioWorklet.addModule('/audio-processor.js');
                workletNode = new AudioWorkletNode(audioContext, 'audio-processor');

                processor = {
                    connect: (destination) => {
                        workletNode.connect(destination);
                    },
                    onaudioprocess: null,
                    workletNode: workletNode,
                    type: 'worklet'
                };
            } catch (workletError) {
                console.warn('AudioWorklet fallback:', workletError);
                processor = audioContext.createScriptProcessor(4096, 1, 1);
                processor.type = 'script';
            }

            setMicrophone(source);
            setMicrophoneAudioContext(audioContext);
            setProcessor(processor);
            setMicrophoneState(1);
        } catch (err) {
            console.error(err);
        }
    };

    const startMicrophone = useCallback(() => {
        if (!processor || !microphone || !microphoneAudioContext) return;

        if (processor.type === 'worklet') {
            microphone.connect(processor.workletNode);
            processor.workletNode.connect(microphoneAudioContext.destination);
        } else {
            microphone.connect(processor);
            processor.connect(microphoneAudioContext.destination);
        }
        setMicrophoneState(2);
    }, [processor, microphoneAudioContext, microphone]);

    return (
        <MicrophoneContext.Provider
            value={{
                microphone,
                startMicrophone,
                setupMicrophone,
                microphoneState,
                microphoneAudioContext,
                setMicrophoneAudioContext,
                processor,
            }}
        >
            {children}
        </MicrophoneContext.Provider>
    );
};

export const useMicrophone = () => useContext(MicrophoneContext);
export { MicrophoneContextProvider };

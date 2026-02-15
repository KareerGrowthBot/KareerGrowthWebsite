"use client";

import { createContext, useContext, useState, useRef } from "react";
import { getAuthToken, sendKeepAliveMessage } from "../utils/deepgramUtils";

const DeepgramContext = createContext();

const DeepgramContextProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [socketState, setSocketState] = useState(-1);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [rateLimited, setRateLimited] = useState(false);
    const keepAlive = useRef();
    const maxReconnectAttempts = 5;
    const userInitiatedClose = useRef(false);
    const isConnecting = useRef(false);

    const connectToDeepgram = async () => {
        if (isConnecting.current || socketState === 0 || socketState === 1) {
            return;
        }

        if (reconnectAttempts >= maxReconnectAttempts) {
            setRateLimited(true);
            return;
        }

        isConnecting.current = true;
        userInitiatedClose.current = false;
        setSocketState(0);

        try {
            const authToken = await getAuthToken();

            if (!authToken || !authToken.trim()) {
                isConnecting.current = false;
                setSocketState(2);
                setRateLimited(true);
                return;
            }

            const newSocket = new WebSocket("wss://agent.deepgram.com/v1/agent/converse", [
                "token",
                authToken,
            ]);

            const onOpen = () => {
                isConnecting.current = false;
                setSocketState(1);
                setReconnectAttempts(0);
                keepAlive.current = setInterval(sendKeepAliveMessage(newSocket), 10000);
            };

            const onError = (err) => {
                isConnecting.current = false;
                setSocketState(2);
                console.error("Websocket error", err);
            };

            const onClose = () => {
                isConnecting.current = false;
                clearInterval(keepAlive.current);
                const wasUserInitiated = userInitiatedClose.current;
                setSocketState(-1);

                if (!wasUserInitiated) {
                    setTimeout(() => {
                        if (!userInitiatedClose.current) {
                            connectToDeepgram();
                        }
                    }, 3000);
                    setReconnectAttempts((attempts) => attempts + 1);
                } else {
                    setReconnectAttempts(0);
                }
            };

            newSocket.binaryType = "arraybuffer";
            newSocket.addEventListener("open", onOpen);
            newSocket.addEventListener("error", onError);
            newSocket.addEventListener("close", onClose);
            newSocket.addEventListener("message", () => { });

            setSocket(newSocket);
        } catch (error) {
            console.error("Error connecting to Deepgram:", error);
            isConnecting.current = false;
            setSocketState(2);
            setRateLimited(true);
        }
    };

    const disconnectFromDeepgram = () => {
        if (socket) {
            userInitiatedClose.current = true;
            isConnecting.current = false;
            clearInterval(keepAlive.current);
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
            setSocket(null);
            setSocketState(-1);
        }
    };

    return (
        <DeepgramContext.Provider
            value={{
                socket,
                socketState,
                rateLimited,
                connectToDeepgram,
                disconnectFromDeepgram,
                userInitiatedClose,
            }}
        >
            {children}
        </DeepgramContext.Provider>
    );
};

function useDeepgram() {
    return useContext(DeepgramContext);
}

export { DeepgramContextProvider, useDeepgram };

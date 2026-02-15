export const getAuthToken = async () => {
    try {
        // Return key directly from environment variables in Vite
        const key = import.meta.env.VITE_DEEPGRAM_API_KEY;

        if (key && key.trim()) {
            return key.trim();
        } else {
            throw new Error("VITE_DEEPGRAM_API_KEY not found in environment variables");
        }
    } catch (error) {
        console.error("Failed to retrieve Deepgram API key:", error);
        throw error;
    }
};

export const sendKeepAliveMessage = (socket) => {
    return () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "KeepAlive" }));
        }
    };
};

export const sendSocketMessage = (socket, message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};

export const sendMicToSocket = (socket) => {
    return (event) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const audioData = event.inputBuffer.getChannelData(0);
            // Downsample from 48000 to 16000
            const sampleRateRatio = 3;
            const newLength = Math.floor(audioData.length / sampleRateRatio);
            const result = new Int16Array(newLength);

            for (let i = 0; i < newLength; i++) {
                result[i] = Math.min(1, audioData[i * sampleRateRatio]) * 0x7fff;
            }

            socket.send(result.buffer);
        }
    };
};

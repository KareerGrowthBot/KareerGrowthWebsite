export const createAudioBuffer = (ctx, data) => {
    try {
        const audioData = new Int16Array(data);
        const audioBuffer = ctx.createBuffer(1, audioData.length, 24000);
        const channelData = audioBuffer.getChannelData(0);

        for (let i = 0; i < audioData.length; i++) {
            channelData[i] = audioData[i] / 32768;
        }

        return audioBuffer;
    } catch (error) {
        console.error("Error creating audio buffer:", error);
        return null;
    }
};

export const playAudioBuffer = (ctx, audioBuffer, startTimeRef, analyser) => {
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    if (analyser) {
        source.connect(analyser);
        analyser.connect(ctx.destination);
    } else {
        source.connect(ctx.destination);
    }

    const currentTime = ctx.currentTime;
    if (startTimeRef.current < currentTime) {
        startTimeRef.current = currentTime;
    }

    source.start(startTimeRef.current);
    startTimeRef.current += audioBuffer.duration;

    return source;
};

export const downsample = (buffer, inputSampleRate, outputSampleRate) => {
    if (inputSampleRate === outputSampleRate) {
        return buffer;
    }

    const sampleRateRatio = inputSampleRate / outputSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
        const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0;
        let count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = accum / count;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }

    return result;
};

export const convertFloat32ToInt16 = (buffer) => {
    let l = buffer.length;
    const buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7fff;
    }
    return buf.buffer;
};

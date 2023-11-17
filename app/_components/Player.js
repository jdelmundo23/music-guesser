import { useEffect, useRef, useState } from "react";

export default function Player({ guessNum, link }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ctx, setCtx] = useState('');
    const bufferSourceRef = useRef(null);
    const [isLoaded, setLoaded] = useState(false);
    const [audioBuff, setAudiobuff] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        setCtx(new AudioContext());
    }, [])
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (isPlaying) {
                const elapsed = ctx.currentTime - startTime;
                const length = audioBuff.duration;
                const progress = (elapsed / length);
                setProgress(progress);
            }
        }, 50)

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, ctx, startTime, audioBuff])

    useEffect(() => {
        if (ctx) {
            (async () => {
                const result = await fetch(`api/audio/${link}`)
                const buff = await result.arrayBuffer();
                ctx.decodeAudioData(buff, (buffer) => {
                    setAudiobuff(cropAudioBuffer(buffer, ctx, 0, 30));
                    setLoaded(true);
                })
            })()
        }
    }, [ctx])

    const startStreaming = () => {
        setProgress(0);
        if (bufferSourceRef.current) {
            bufferSourceRef.current.stop();
        }
        const bufferSource = ctx.createBufferSource();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        const time = guessNum * 2.5;

        const buffer = cloneAudioBuffer(audioBuff, ctx);

        bufferSource.buffer = buffer;
        bufferSource.connect(analyser);
        analyser.connect(ctx.destination);
        bufferSource.start(0);
        bufferSourceRef.current = bufferSource;
        bufferSource.onended = () => {
            setIsPlaying(false);
        }
        bufferSourceRef.current.stop(ctx.currentTime + time);
        setStartTime(ctx.currentTime);
        setIsPlaying(true);
    }

    return (
        <div>
            {isLoaded ?
                <button disabled={isPlaying}>
                    <svg className={`right-2 top-2 pointer-events-none ${!isPlaying ? 'active:scale-95 opacity-100' : 'opacity-60'} active:transition duration-100`} height="50" width="50">
                        <circle className={`pointer-events-auto ${!isPlaying && 'cursor-pointer'}`} cx="30" cy="20" r="15" fill="white" onClick={() => { startStreaming() }}></circle>
                        <polygon points="25,12 25,28 38,20" fill="black"></polygon>;
                    </svg>
                </button> : <p>Loading Audio</p>}
            <div className="w-full h-2 relative">
                <div className="bg-zinc-700 w-full h-2 absolute top-0 left-0 opacity-40"></div>
                <div className="bg-zinc-700 absolute h-2 top-0 left-0" style={{ width: `${(((guessNum) * 2.5) / 30) * 100}%` }}></div>
                <div className={`absolute top-0 left-0 bg-green-800 h-full`} style={{ width: `${(progress * 100)}%` }}></div>
                {new Array(5).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute h-full border-r border-gray-30`}
                        style={{ left: `${(((i + 1) * 2.5) / 30) * 100}%` }}
                    />
                ))}
            </div>
        </div>
    )
}

function cloneAudioBuffer(originalBuffer, audioContext) {
    const clonedBuffer = audioContext.createBuffer(
        originalBuffer.numberOfChannels,
        originalBuffer.length,
        originalBuffer.sampleRate
    );

    for (let channel = 0; channel < originalBuffer.numberOfChannels; channel++) {
        const originalChannelData = originalBuffer.getChannelData(channel);
        const clonedChannelData = clonedBuffer.getChannelData(channel);

        clonedChannelData.set(originalChannelData);
    }

    return clonedBuffer;
}


function cropAudioBuffer(originalBuffer, audioContext, startSeconds, endSeconds) {
    const startSample = Math.floor(startSeconds * originalBuffer.sampleRate);
    const endSample = Math.min(
        Math.ceil(endSeconds * originalBuffer.sampleRate),
        originalBuffer.length
    );

    const croppedBuffer = audioContext.createBuffer(
        originalBuffer.numberOfChannels,
        endSample - startSample,
        originalBuffer.sampleRate
    );

    for (let channel = 0; channel < originalBuffer.numberOfChannels; channel++) {
        const originalChannelData = originalBuffer.getChannelData(channel);
        const croppedChannelData = croppedBuffer.getChannelData(channel);

        croppedChannelData.set(originalChannelData.subarray(startSample, endSample));
    }

    return croppedBuffer;
}
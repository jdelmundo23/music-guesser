import { useEffect, useRef, useState } from "react";

export default function Player({ link }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ctx, setCtx] = useState('');
    const bufferSourceRef = useRef(null);
    const [played, setPlayed] = useState(false);


    isPlaying && bufferSourceRef.current.stop(ctx.currentTime + 5);
    useEffect(() => {
        setCtx(new AudioContext());
    }, [])

    useEffect(() => {
        if (ctx) {
            (async () => {
                const result = await fetch(`api/audio/${link}`)
                const buff = await result.arrayBuffer();

                const bufferSource = ctx.createBufferSource();
                ctx.decodeAudioData(buff, (buffer) => {
                    bufferSource.buffer = buffer;
                    bufferSource.connect(ctx.destination);
                    bufferSource.onended = () => setIsPlaying(false);
                    bufferSourceRef.current = bufferSource;
                    console.log('done');
                });
            })()
        }
    }, [ctx])

    const startStreaming = () => {
        if (bufferSourceRef.current && !isPlaying) {
            if (!played) {
                bufferSourceRef.current.start();
                setPlayed(true);
            }
            setIsPlaying(true);
        }
    };

    const stopStreaming = () => {
        if (bufferSourceRef.current && isPlaying) {
            // ctx.suspend().then(() => {
            //     setIsPlaying(false);
            // });
        }
    };

    return (
        <div>
            <button onClick={startStreaming} disabled={isPlaying}>
                Start Streaming
            </button>
            <button onClick={stopStreaming} disabled={!isPlaying}>
                Stop Streaming
            </button>
        </div>
    )
}
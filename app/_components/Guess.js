import { useState, useEffect, useRef } from 'react'
import { Lora } from 'next/font/google'

const lora = Lora({
    subsets: ['latin'],
});

export default function Guess({ status, tracks }) {
    const [answer, setAnswer] = useState("");
    const [trackList, setTracks] = useState([]);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const isActive = status === "active";
    useEffect(() => {
        setTimeout(() => isActive && inputRef.current.focus(), 75);
    }, [isActive]);
    function onInputChange(input) {
        setAnswer(input);
        const list = tracks.filter(track => track.title.toLowerCase().includes(input.toLowerCase()))
        setTracks(list.slice(0,4));
    }
    return (
        <div className='relative'>
            <input required spellCheck={false} ref={inputRef} disabled={!isActive} value={answer} className={`${lora.className} w-full text-2xl bg-transparent border-2 rounded-sm ${getColor(status)} text-white h-[15%] transition-colors duration-150 outline-none px-2 py-2 tracking-wide selection:bg-gray-50 selection:text-black`} onChange={(e) => onInputChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}></input>
            <ul className='absolute z-10 bg-white'>
                {(isActive && focused && answer) && trackList.map(track => {
                    return  <li className='border border-black' key={track.id} onClick={() => {onInputChange(track.title); inputRef.current.blur()}} onMouseDown={e=> e.preventDefault()}>{track.title}</li>
                })}
            </ul>
        </div>
    )
}

function getColor(status) {
    switch (status) {
        case "active":
            return "border-gray-300";
        case "wrong":
            return "border-red-800";
        case "pending":
            return "border-zinc-700";
        case "correct":
            return "border-green-500";
    }
}
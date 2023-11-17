import { useState, useEffect, useRef } from 'react'
import { Lora } from 'next/font/google'

const lora = Lora({
    subsets: ['latin'],
});

export default function Guess({ status }) {
    const [answer, setAnswer] = useState("");
    const inputRef = useRef(null);
    const isActive = status === "active";
    useEffect(() => {
        setTimeout(() => isActive && inputRef.current.focus(), 75);
    }, [isActive]);
    return <input required spellCheck={false} ref={inputRef} disabled={!isActive} value={answer} className={`${lora.className} h-[10%] text-2xl bg-transparent border-2 rounded-sm ${getColor(status)} text-white h-[15%] transition-colors duration-150 outline-none px-2 py-2 tracking-wide selection:bg-gray-50 selection:text-black`} onChange={e => setAnswer(e.target.value)}></input>
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
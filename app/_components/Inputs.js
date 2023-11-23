'use client'
import { useEffect, useState, Suspense } from 'react'
import Guess from "./Guess.js"
import { Inter } from "next/font/google"
import Player from "./Player.js"

const inter = Inter({
    subsets: ['latin'],
})

const maxGuesses = 6;

export default function Inputs({ gameInfo }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isGameOver, setGameOver] = useState(false);
    const [game, setGame] = useState('')
    const [allTracks, setAllTracks] = useState([]);
    useEffect(() => {
        (async () => {
            const info = await gameInfo;
            setGame(info);
            setAllTracks(info.getAllTracks());
        })();
    }, [])
    function submitAnswer(e) {
        e.preventDefault()
        const answer = e.target[activeIndex]?.value;
        if (game.testAnswer(answer)) {
            setGameOver(true);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    }

    return (
        <div className='w-[40%]'>
            <form onSubmit={e => submitAnswer(e)} className="flex flex-col ">
                <div className="flex flex-col gap-y-3">
                    {new Array(maxGuesses).fill(null).map((_, i) =>
                        <Guess key={i} status={getBoxStatus(i, activeIndex, isGameOver)} tracks={allTracks}></Guess>
                    )}
                </div>
                <div className="flex justify-center">
                    <button disabled={isGameOver || activeIndex >= maxGuesses} className={`${inter.className} h-12 bg-white border rounded-sm w-44 text-3xl font-medium text-zinc-700 tracking-wider disabled:opacity-40 transition-colors duration-100`}>SUBMIT</button>
                </div>
            </form>
            {game && <Player guessNum={isGameOver ? -1 : activeIndex} link={game.getID()} maxGuesses={maxGuesses}/>}
        </div>
    )
}

function getBoxStatus(index, activeIndex, isGameOver) {
    return (
        (activeIndex === index && !isGameOver) ? "active" :
            activeIndex > index ? "wrong" :
                activeIndex < index ? "pending" :
                    "correct")
}

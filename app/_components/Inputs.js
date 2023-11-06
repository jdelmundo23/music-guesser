'use client'
import { useState } from 'react'
import Guess from "./Guess.js"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
})

export default function Game() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isGameOver, setGameOver] = useState(false);
    function submitAnswer(e) {
        e.preventDefault()
        const answer = e.target[activeIndex]?.value;
        if (testGuess(answer)) {
          setGameOver(true);
        } else {
          setActiveIndex(activeIndex + 1);
        }
      }

    return <form onSubmit={e => submitAnswer(e)} className="flex flex-col w-[40%]">
        <div className="flex flex-col gap-y-3">
            {new Array(6).fill(null).map((_, i) =>
                <Guess key={i} status={getBoxStatus(i, activeIndex, isGameOver)}></Guess>
            )}
        </div>
        <div className="flex justify-center">
            <button disabled={isGameOver || activeIndex > 5} className={`${inter.className} h-12 bg-white border rounded-sm w-[30%] text-3xl font-medium text-zinc-700 tracking-wider disabled:opacity-40 transition-colors duration-100`}>SUBMIT</button>
        </div>
    </form>
}

function getBoxStatus(index, activeIndex, isGameOver) {
    return (
        (activeIndex === index && !isGameOver) ? "active" :
            activeIndex > index ? "wrong" :
                activeIndex < index ? "pending" :
                    "correct")
}

function testGuess(guess) {
    return guess === "correct answer";
}
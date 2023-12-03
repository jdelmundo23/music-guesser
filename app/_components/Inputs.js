'use client'
import { useEffect, useState, Suspense } from 'react'
import Guess from "./Guess.js"
import Player from "./Player.js"
import Button from './Button.js'

const maxGuesses = 6;

export default function Inputs({ gameInfo, resetGame, nextSong}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isGameOver, setGameOver] = useState(false);
    const times = calculateTimes(0.5, maxGuesses, 30)
    function submitAnswer(e) {
        e.preventDefault()
        const answer = e.target[activeIndex]?.value;
        if (gameInfo.testAnswer(answer)) {
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
                        <Guess key={i} status={getBoxStatus(i, activeIndex, isGameOver)} tracks={gameInfo.getAllTracks()}></Guess>
                    )}
                </div>
                <div className="flex justify-center h-12">
                    {!(isGameOver || activeIndex >= maxGuesses) ? 
                    <>
                        <Button text='SUBMIT'/>
                        <Button onBtnClick={e => {e.preventDefault(); setActiveIndex(activeIndex + 1)}} text={activeIndex >= maxGuesses -1 ? 'GIVE UP' : `SKIP (+${times[activeIndex+1] - times[activeIndex]})`}/>
                    </>
                    :
                    <>
                        <Button onBtnClick={resetGame} text='NEW ARTIST'/>
                        <Button onBtnClick={nextSong} text='NEXT SONG'/>
                    </>}
                </div>
            </form>
            <Player guessNum={isGameOver ? maxGuesses : activeIndex} link={gameInfo.getID()} times={times}/>
            {(isGameOver || (activeIndex >= maxGuesses)) && <div className='text-white'>{gameInfo.getAnswer()}</div>}
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

const calculateTimes = (initial, maxGuesses, timeLimit) => {
    const times = [];
    const base = Math.pow(timeLimit / initial, 1 / maxGuesses);

    for (let i = 0; i < maxGuesses; i++) {
        initial *= base;
        times.push(Math.ceil(initial));
    }
    times.push(timeLimit);

    return times;
};

'use client'
import {useState, useRef, useEffect} from 'react';
import { Lora, Inter } from '@next/font/google'

const lora = Lora({
  subsets: ['latin'],
})
const inter = Inter({
  subsets: ['latin'],
})

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  function submitAnswer(e) {
    e.preventDefault()
    const answer = e.target[activeIndex]?.value;
    if(testGuess(answer)){
      setGameOver(true);
    } else{
      setActiveIndex(activeIndex + 1);
    }
  }
  function getBoxStatus(index){
    return (
    (activeIndex === index && !isGameOver) ? "active": 
    activeIndex > index ? "wrong" : 
    activeIndex < index ? "pending":
    "correct")
  }
  return (
    <form onSubmit={e => submitAnswer(e)} className="flex flex-col w-screen h-screen items-center space-y-8 justify-center justify-items-center bg-zinc-900">
      <div className="flex flex-col space-y-3 h-[40%] w-[55%]">
        {new Array(6).fill(null).map((_, i) => 
          <Guess key={i} status={getBoxStatus(i)}></Guess>
        )}
      </div>
      <div className="w-[10%] h-[5%]">
        <button disabled={isGameOver || activeIndex > 5} className={`${inter.className} bg-white border rounded-sm w-full h-full text-3xl font-medium text-zinc-700 tracking-wider disabled:opacity-40 transition-colors duration-100`}>SUBMIT</button>
      </div>
    </form>
  )
}

function Guess( {status} ) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  const isActive = status === "active";
  useEffect(() => {
    setTimeout(() => isActive && inputRef.current.focus(), 75);
  }, [isActive]);
  return <input required spellCheck={false} ref={inputRef} disabled={!isActive} value={answer} className={`${lora.className} text-3xl bg-transparent border-2 rounded-sm ${getColor(status)} text-white h-[15%] transition-colors duration-150 outline-none px-2 tracking-wide selection:bg-gray-50 selection:text-black`} onChange={e => setAnswer(e.target.value)}></input>
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

function testGuess(guess) {
  return guess === "correct answer";
}
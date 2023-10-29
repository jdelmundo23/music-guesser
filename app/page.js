'use client'
import {useState, useRef, useEffect} from 'react';

export default function App() {
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const [activeIndex, setActiveIndex] = useState(0);
  function submitAnswer(e) {
    e.preventDefault()
    setActiveIndex(activeIndex + 1);
  }
  function getBoxStatus(index){
    return (
    activeIndex === index ? "active": 
    activeIndex > index ? "wrong" : 
    "pending")
  }
  return (
    <form onSubmit={e => submitAnswer(e)} className="flex flex-col w-screen h-screen items-center justify-center justify-items-center bg-zinc-900">
      <div className="flex flex-col space-y-3 h-[40%] w-[70%]">
        {answers.map((_, i) => 
          <Guess key={i} status={getBoxStatus(i)}></Guess>
        )}
      </div>
      <div>
        <button className="bg-gray-300 border rounded-sm">Submit Answer</button>
      </div>
    </form>
  )
}

function Guess( {status} ) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  const isActive = status === "active";
  useEffect(() => {
    isActive && inputRef.current.focus();
  }, [isActive]);
  return <input required ref={inputRef} disabled={!isActive} value={answer} className={`bg-transparent border ${getColor(status)} text-white h-[10%]`} onChange={e => setAnswer(e.target.value)}></input>
}

function getColor(status) {
  switch (status) {
    case "active":
      return "border-gray-300";
    case "wrong":
      return "border-red-800";
    case "pending":
      return "border-gray-600";
  }
}

function testGuess(guess) {
  return guess === "nene";
}
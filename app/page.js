'use client'
import {useState, useRef, useEffect} from 'react';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  function submitAnswer(e) {
    e.preventDefault()
    console.log("submit");
    const answer = e.target[activeIndex].value;
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
    <form onSubmit={e => submitAnswer(e)} className="flex flex-col w-screen h-screen items-center justify-center justify-items-center bg-zinc-900">
      <div className="flex flex-col space-y-3 h-[40%] w-[70%]">
        {new Array(6).fill(null).map((_, i) => 
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
    case "correct":
      return "border-green-500";
  }
}

function testGuess(guess) {
  return guess === "correct answer";
}
'use client'
import {useState} from 'react';

export default function App() {
  const [answers, setAnswers] = useState(Array(6).fill(null));
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center justify-items-center bg-zinc-900">
      <div className="flex flex-col space-y-3 h-[40%] w-[70%]">
        {answers.map((_, i) => 
          <Guess key={i}></Guess>
        )}
      </div>``
      <div>
        <button className="bg-gray-300 border rounded-sm">Submit Answer</button>
      </div>
    </div>
  )
}

function Guess() {
  const [answer, setAnswer] = useState("");
  return <input className="bg-transparent border border-gray-300 text-white h-[10%]" onChange={e => setAnswer(e.target.value)}></input>
}
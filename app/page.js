'use client'
import { useState, useEffect } from 'react';
import { Inter } from "next/font/google"
import Guess from "./_components/Guess.js"

const inter = Inter({
  subsets: ['latin'],
})

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [query, setQuery] = useState('');
  const [token, setToken] = useState('');
  const [artists, setArtists] = useState([]);

  console.log(artists[0]?.name);
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setToken(token);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (token && query){
        const data = await searchArtists(query, token);
        setArtists(data);
      }
    })();
  }, [query]);
  function submitAnswer(e) {
    e.preventDefault()
    const answer = e.target[activeIndex]?.value;
    if (testGuess(answer)) {
      setGameOver(true);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }
  function getBoxStatus(index) {
    return (
      (activeIndex === index && !isGameOver) ? "active" :
        activeIndex > index ? "wrong" :
          activeIndex < index ? "pending" :
            "correct")
  }
  return (
    <>
      <input value={query} onChange={e => {setQuery(e.target.value)}}></input>
      <ul>
        {artists.map(artist => {
          return <li key={artist.key}>{artist.name}</li>
        })}
      </ul>
      <form onSubmit={e => submitAnswer(e)} className="flex flex-col w-screen h-screen items-center space-y-8 justify-center justify-items-center bg-zinc-900">
        <div className="flex flex-col space-y-3 h-[40%] w-[55%]">
          {new Array(6).fill(null).map((_, i) =>
            <Guess key={i} status={getBoxStatus(i)}></Guess>
          )}
        </div>
        <div className="w-40 h-[5%]">
          <button disabled={isGameOver || activeIndex > 5} className={`${inter.className} bg-white border rounded-sm w-full h-full text-3xl font-medium text-zinc-700 tracking-wider disabled:opacity-40 transition-colors duration-100`}>SUBMIT</button>
        </div>
      </form>
    </>
  )
}

function testGuess(guess) {
  return guess === "correct answer";
}

async function getToken() {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('' + ':' + '')
    },
    body: 'grant_type=client_credentials'
  })

  const data = await result.json();

  return data.access_token;
}

async function searchArtists(query, token) {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token}
  })
  const data = await result.json();
  return data.artists.items;
}
'use client'
import { useState, useEffect } from 'react';
import Game from "./_components/Game.js"
import Search from "./_components/Search.js"

export default function App() {
  const [token, setToken] = useState('');
  const [artist, setArtistID] = useState('');
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setToken(token);
    })();
  }, []);
  return (
    <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
      {!artist ? <Search token={token} onSelect={artist => setArtistID(artist)}/> : <Game/>}
    </div>
  )
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

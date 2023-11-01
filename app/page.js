'use client'
import { useState, useEffect } from 'react';
import Game from "./_components/Game.js"

export default function App() {
  const [query, setQuery] = useState('');
  const [token, setToken] = useState('');
  const [artists, setArtists] = useState([]);

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
  return (
    <div>
      <input className={`w-[20%]`} value={query} onChange={e => {setQuery(e.target.value)}}></input>
      <ul>
        {query && artists.map(artist => {
          return <li key={artist.key}>{artist.name}</li>
        })}
      </ul>
      <Game/>
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

async function searchArtists(query, token) {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token}
  })
  const data = await result.json();
  return data.artists.items;
}
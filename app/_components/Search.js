'use client'

import { useState, useEffect, useRef } from 'react';

export default function Search({ token }) {
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [currSelect, setSelect] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        (async () => {
            if (token && query) {
                const data = await searchArtists(query, token);
                setArtists(data);
            }
        })();
    }, [query]);
    return (
        <div className={`w-flex`}>
            <div className={`h-64`}>
                {currSelect &&
                    <div className='h-full flex flex-col items-center justify-between'>
                        <img className='w-44' src={currSelect.imageURL}></img>
                        <p className="text-white text-xl">{currSelect.name}</p>
                    </div>
                }
            </div>
            <input ref={inputRef} className={`w-full`} value={query} onChange={e => { setQuery(e.target.value) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}></input>
            {focused && <ul className="absolute">
                {query && artists.map(artist => {
                    console.log(artist);
                    return <li key={artist.id} onMouseDown={e=> e.preventDefault()}onClick={() => { setSelect({ id: artist.id, name: artist.name, imageURL: artist.images[1]?.url }); setQuery(artist.name);inputRef.current.blur()}} className="cursor-pointer bg-white border border-black">{artist.name}</li>
                })}
            </ul>}
        </div>
    )
}

async function searchArtists(query, token) {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await result.json();
    return data.artists.items;
}
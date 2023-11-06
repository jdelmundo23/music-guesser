'use client'
import { useState, useEffect, useRef } from 'react';
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
})

export default function Search({ onChoose }) {
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [currSelect, setSelect] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        (async () => {
            if (query) {
                try {
                    const result = await fetch(`api/artists/${query}`, { cache: 'no-cache' });
                    const data = await result.json();
                    if (!result.ok) {
                        throw new Error(data.error)
                    }
                    setArtists(data.artists);
                }
                catch (error) {
                    console.error(error);
                }
            }
        })();
    }, [query]);
    return (
        <div className={`${inter.className} h-[55%] flex flex-col items-center`}>
            {/* <div className={`h-64`}>
                {currSelect &&
                    <div className='h-full flex flex-col items-center justify-between'>
                        <img className='w-44  border border-black rounded-md shadow-lg' src={currSelect.imageURL}></img>
                        <p className="text-white text-xl">{currSelect.name}</p>
                    </div>
                }
            </div>
            <input ref={inputRef} className={`w-full`} value={query} onChange={e => { setQuery(e.target.value) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}></input>
            {focused && <ul className="absolute">
                {(query && artists) && artists.map(artist => {
                    return <li key={artist.id} onMouseDown={e=> e.preventDefault()}onClick={() => { setSelect({ id: artist.id, name: artist.name, imageURL: artist.images[1]?.url }); setQuery(artist.name);inputRef.current.blur()}} className="cursor-pointer bg-white border border-black">{artist.name}</li>
                })}
            </ul>}ß
            <button className='w-9/12 bg-green-400'>jo</button> */}
            <div className='h-44 mb-20'>
                {currSelect &&
                    <div className='h-full flex flex-col items-center justify-between'>
                        <img className='w-44  border border-black rounded-md shadow-lg' src={currSelect.imageURL}></img>
                    </div>
                }
            </div>
            <div>
                <input ref={inputRef} className={`w-full rounded-sm`} value={query} onChange={e => { setQuery(e.target.value) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}></input>
                {focused && <ul className="absolute">
                    {(query && artists) && artists.map(artist => {
                        return <li key={artist.id} onMouseDown={e => e.preventDefault()} onClick={() => { setSelect({ id: artist.id, name: artist.name, imageURL: artist.images[1]?.url }); setQuery(artist.name); inputRef.current.blur() }} className="cursor-pointer bg-white border border-black">{artist.name}</li>
                    })}
                </ul>}
            </div>
            <button className='w-9/12 bg-green-400 mt-7' onClick={() => onChoose(currSelect.id)}>Start Game</button>
        </div>
    )
}


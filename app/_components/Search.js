'use client'
import { useState, useEffect, useRef, Suspense } from 'react';
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin'],
})

export default function Search({ onChoose }) {
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedIndex, setSelected] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const inputRef = useRef(null);
    useEffect(() => {
        async function useQuery() {
            if (query) {
                try {
                    const result = await fetch(`api/artists/${query}`, { cache: 'no-cache' });
                    const data = await result.json();
                    if (!result.ok) {
                        throw new Error(data.error)
                    }
                    setArtists(data.artists);
                    setLoading(false);
                    setSelected(null);
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        const delayFetch = setTimeout(() => useQuery(), 500);
        return () => clearTimeout(delayFetch);
    }, [query]);

    return (
        <div className={`${inter.className} h-[75%] w-[80%] flex flex-col items-center gap-y-8`}>
            <h1 className='text-white text-3xl'>Choose an artist:</h1>
            <div className={`w-[25%] h-8`}>
                <input ref={inputRef} className={`w-full h-full rounded-sm text-xl`} value={query} onChange={e => { setQuery(e.target.value), setLoading(true) }}></input>
            </div>
            <ul key={query} className={`flex gap-2`}>
                {(query && !isLoading) ? artists.map((artist, i) => {
                    return (
                        <li key={artist.id} onClick={() => setSelected(i)} className={`border ${i === selectedIndex ? 'border-white' : 'border-black'} bg-black p-4 rounded-lg flex flex-col items-center gap-y-3 w-40 h-60 cursor-pointer`}>
                            <div className='w-32 h-32'>
                                <img src={artist.images[1]?.url} className={`rounded-full w-full h-full object-cover border border-zinc-900`} ></img>
                            </div>
                            <h1 className="text-white text-center">{artist.name}</h1>
                        </li>
                    )
                }) : <p className="text-white"></p>}
            </ul>
            {(selectedIndex != null && query && !isLoading) && <button onClick={() => onChoose(artists[selectedIndex].id)} className='bg-white rounded-sm text-3xl p-2'>Start Game</button>}
        </div>
    )
}


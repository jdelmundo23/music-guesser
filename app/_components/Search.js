'use client'
import { useState, useEffect, useRef } from 'react';
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin'],
})

export default function Search({ onChoose }) {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
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
                    setUsers(data.users);
                    setLoading(false);
                    setSelected(null);
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        const delayFetch = setTimeout(() => useQuery(), 250);
        return () => clearTimeout(delayFetch);
    }, [query]);

    return (
        <div className={`${inter.className} h-[75%] w-[80%] flex flex-col items-center gap-y-8`}>
            <h1 className='text-white text-3xl'>Choose an artist:</h1>
            <div className={`w-[25%] h-8`}>
                <input ref={inputRef} className={`w-full h-full rounded-sm text-xl`} value={query} onChange={e => { setQuery(e.target.value), setLoading(true) }}></input>
            </div>
            <ul key={query} className={`flex gap-2`}>
                {(query && !isLoading) ? users.map((artist, i) => {
                    return (
                        <li key={artist.id} onClick={() => setSelected(i)} className={`relative border ${i === selectedIndex ? 'border-white' : 'border-black'} bg-black p-4 rounded-lg flex flex-col items-center gap-y-3 w-40 h-60 cursor-pointer`}>
                            {artist.verified && <svg className='absolute top-1 right-1' width='24' height='24' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="verified">
                                <path fill="#00c6ff" fillRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM11.2071 16.2071L18.2071 9.20711L16.7929 7.79289L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3946 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3946 11.2071 16.2071Z" clipRule="evenodd" className="color000000 svgShape"></path>
                            </svg>}                            
                            <div className='w-32 h-32'>
                                <img src={artist.avatar_url} className={`rounded-full w-full h-full object-cover border border-zinc-900`} ></img>
                            </div>
                            <h1 className="text-white text-center">{artist.username}</h1>
                        </li>
                    )
                }) : <p className="text-white"></p>}
            </ul>
            {(selectedIndex != null && query && !isLoading) && <button onClick={() => onChoose(users[selectedIndex].id)} className='bg-white rounded-sm text-3xl p-2'>Start Game</button>}
        </div>
    )
}


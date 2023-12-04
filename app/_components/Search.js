'use client'
import { useState, useEffect, useRef } from 'react';
import { Inter } from "next/font/google"
import UserCard from './UserCard.js'
import Button from './Button.js'
const inter = Inter({
    subsets: ['latin'],
})

export default function Search({ onChoose }) {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedIndex, setSelected] = useState(null);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        async function querySearch() {
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
        const delayFetch = setTimeout(() => querySearch(), 500);
        return () => clearTimeout(delayFetch);
    }, [query]);

    return (
        <div className={`${inter.className} h-[75%] w-[80%] flex flex-col items-center gap-y-8`}>
            <h1 className='text-white text-3xl'>Choose an artist:</h1>
            <input className={`w-[25%] h-8 rounded-sm text-xl`} value={query} onChange={e => { setQuery(e.target.value), setLoading(true) }}></input>
            <ul key={query} className={`flex gap-2`}>
                {(users && !isLoading) && users.map((artist, i) => <UserCard key={artist.id} artist={artist} onSelect={() => setSelected(i)} isSelected={i === selectedIndex} />)}
                {(isLoading && query) && <p className='text-white'>Loading Users</p>}
            </ul>
            {(selectedIndex != null && query && !isLoading) && <Button onBtnClick={() => onChoose(users[selectedIndex].id)} text='START'/>}
        </div>
    )
}


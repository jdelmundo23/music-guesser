'use client'
import { useState } from 'react'
import Inputs from "./Inputs.js"
import Search from "./Search.js"

export default function Game() {
    const [artist, setArtistID] = useState('');
    return <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
        {!artist ? <Search onChoose={artist => setArtistID(artist)}/> : <Inputs/>}
    </div>
}
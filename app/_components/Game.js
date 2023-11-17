'use client'
import { useState } from 'react'
import Inputs from "./Inputs.js"
import Search from "./Search.js"
import createGame from 'app/_lib/gameInfo.js'

export default function Game() {
    const [artistID, setArtistID] = useState('');
    const gameInfo = artistID && createGame(artistID);
    return <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
        {!artistID ? <Search onChoose={artist => setArtistID(artist)}/> : <Inputs gameInfo={gameInfo} />}
    </div>
}
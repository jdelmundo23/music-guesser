'use client'
import { useState, useEffect } from 'react'
import Inputs from "./Inputs.js"
import Search from "./Search.js"
import createGame from 'app/_lib/gameInfo.js'

export default function Game() {
    const [artistID, setArtistID] = useState('');
    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        if(artistID && !gameInfo) {
            (async() => {
                const info = await createGame(artistID)
                setGameInfo(info)
            })()
        }
    }, [artistID, gameInfo])
    function clearSong() {
        setGameInfo(null);
    }
    function clearArtist() {
        setArtistID(null);
    }
    return <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
        {!artistID ? <Search onChoose={artist => setArtistID(artist)}/> : !gameInfo ? <h1 className='text-white'>Loading</h1>: <Inputs gameInfo={gameInfo} resetGame={clearArtist} nextSong={clearSong}/>}
    </div>
}
'use client'
import { useState, useEffect } from 'react'
import Inputs from "./Inputs.js"
import Search from "./Search.js"
import Landing from "./Landing.js"
import createGame from 'app/_lib/gameInfo.js'

export default function Game() {
    const [artistID, setArtistID] = useState('');
    const [gameInfo, setGameInfo] = useState(null);
    const [isStarted, setStarted] = useState(false);

    useEffect(() => {
        if(artistID && !gameInfo) {
            (async() => {
                const info = await createGame(artistID)
                setGameInfo(info)
            })()
        }
    }, [artistID, gameInfo])
    function startGame() {
        setStarted(true);
    }
    function clearSong() {
        setGameInfo(null);
    }
    function clearArtist() {
        setArtistID(null);
        setGameInfo(null);
    }
    return <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
        {!isStarted ? <Landing startGame={startGame}/> : !artistID ? <Search onChoose={artist => setArtistID(artist)}/> : !gameInfo ? <h1 className='text-white'>Loading</h1>: <Inputs gameInfo={gameInfo} resetGame={clearArtist} nextSong={clearSong}/>}
    </div>
}
import Button from "./Button.js"
import { Lora } from 'next/font/google'

const lora = Lora({
    subsets: ['latin'],
});

export default function Landing({startGame}) {
    return (
        <div className={`${lora.className} text-white flex flex-col items-center`}>
            <h1 className='text-4xl'>Music Guessing Game</h1>
            <h2 className='text-2xl'>For SoundCloud</h2>
            <Button className={''} onBtnClick={startGame} text={"PLAY"}/>
        </div>
    )
}
import Button from './Button.js'
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin'],
})

export default function Modal({trackTitle, trackImg, gameWon, closeModal}) {
    return (
        <div className={`${inter.className} fixed inset-0 bg-zinc-950/60 flex items-center justify-center z-50 text-white`}>
            <div className='bg-zinc-800 w-[30%] flex flex-col items-center'>
                {gameWon ? 
                    <div>Congratulations</div>
                    :
                    <div>Game Over</div>
                }
                <div>The track was</div>
                <img src={trackImg}></img>
                <div>{trackTitle}</div>
                <Button text={'CLOSE'} onBtnClick={closeModal}></Button>
            </div>
        </div>
    )
}
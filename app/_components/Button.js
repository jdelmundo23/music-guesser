import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ['latin'],
})

export default function Button({onBtnClick, text}) {
    return <button onClick={onBtnClick} className={`${inter.className} max-w-[200px] w-full h-12 bg-white border rounded-sm text-2xl font-medium text-zinc-700 tracking-wider disabled:opacity-40 transition-colors duration-100`}>{text}</button>
}
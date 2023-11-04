import Game from "./_components/Game.js"
import Search from "./_components/Search.js"
import { cookies } from 'next/headers'

export default function App() {
  const cookieList = cookies();
  const token = cookieList.get('token').value;
  return (
    <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center">
      {true ? <Search token={token} /> : <Game/>}
    </div>
  )
}

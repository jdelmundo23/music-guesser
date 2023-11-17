export default function UserCard({ artist, onSelect, isSelected }) {
    return (
        <li onClick={onSelect} className={`relative border ${isSelected ? 'border-white' : 'border-black'} bg-black p-4 rounded-lg flex flex-col items-center gap-y-3 w-40 h-60 cursor-pointer`}>
            {artist.verified && <svg className='absolute top-1 right-1' width='24' height='24' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="verified">
                <path fill="#00c6ff" fillRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM11.2071 16.2071L18.2071 9.20711L16.7929 7.79289L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3946 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3946 11.2071 16.2071Z" clipRule="evenodd" className="color000000 svgShape"></path>
            </svg>}
            <div className='w-32 h-32'>
                <img src={artist.avatar_url} className={`rounded-full w-full h-full object-cover border border-zinc-900`} ></img>
            </div>
            <h1 className="text-white text-center">{artist.username}</h1>
        </li>
    )
}
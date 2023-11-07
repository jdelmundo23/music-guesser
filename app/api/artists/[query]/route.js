import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const token = req.cookies.get('token').value;
    const query = params.query;

    if (token) {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=6`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        const data = await result.json();
        return NextResponse.json({ artists: data.artists.items }, {status: 200});
    }   
    return NextResponse.json({error: 'No access token provided.'}, {status: 400});
}
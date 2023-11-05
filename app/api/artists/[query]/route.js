import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const token = req.cookies.get('token').value;
    const query = params.query;
    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await result.json();
    return new NextResponse(JSON.stringify({ artists: data.artists.items }), {
        status: 200,
    });
}
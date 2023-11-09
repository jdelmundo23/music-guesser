import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const token = req.cookies.get('token').value;
    const artistID = params.artistID;
    if (token) {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        const data = await result.json();
        return NextResponse.json({ tracks: data.tracks }, {status: 200});
    }   
    return NextResponse.json({error: 'No access token provided.'}, {status: 400});
}
import { NextResponse } from 'next/server'
import Soundcloud from "soundcloud.ts"

export async function GET(req, { params }) {
    const soundcloud = new Soundcloud();
    const query = params.query;
    const result = await soundcloud.tracks.searchV2({ q: query, limit: 5})
    return NextResponse.json({ tracks: result.collection }, {status: 200});
}
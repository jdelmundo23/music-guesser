import Soundcloud from 'soundcloud.ts'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const soundcloud = new Soundcloud();
    const id = params.artistID;
    const data = await soundcloud.api.getV2(`/users/${id}/toptracks`)
    return NextResponse.json({ toptracks: data.collection }, {status: 200});
}
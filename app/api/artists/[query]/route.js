import { NextResponse } from 'next/server'
import Soundcloud from "soundcloud.ts"

export async function GET(req, { params }) {
    const soundcloud = new Soundcloud();
    const query = params.query;
    const result = await soundcloud.users.searchV2({ q: query, limit: 6})
    return NextResponse.json({ users: result.collection }, {status: 200});
}
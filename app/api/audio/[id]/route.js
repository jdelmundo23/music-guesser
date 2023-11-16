import Soundcloud from 'soundcloud.ts'

export async function GET(req, { params }) {
    const soundcloud = new Soundcloud();
    const id = params.id;
    const stream = await soundcloud.util.streamTrack(`https://api.soundcloud.com/tracks/${id}`);
    const res = new Response(stream, { headers: {'Content-Type' : 'audio/mp3'}});
    return res;
}
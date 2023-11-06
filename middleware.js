import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function middleware(req) {
    const response = NextResponse.next();
    if(!req.cookies.has('token')){
        const token = await getValidToken();
        response.cookies.set({
            name: "token",
            value: token,
            maxAge: 60*60,
            httpOnly: true,
            sameSite: 'strict',
        });
    }
    else{
        
    }
    return response;
}

export const config = {
    matcher: ['/']
}

async function getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
      },
      body: 'grant_type=client_credentials'
    })
  
    const data = await result.json();
  
    return data.access_token;
}

async function getValidToken() {
    const token = getToken();
    if (token) {
        return token;
    }
    else {
        throw new Error('Invalid token (Bad Credentials)')
    }
}
  
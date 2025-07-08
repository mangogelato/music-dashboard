import { ST } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

const CLIENT_ID = "1080ed0f9ce54d028977b1e993c21bee"
const RESPONSE_TYPE = "code"
const REDIRECT_URI = "http://localhost:3000"
const STATE = (10000000000 + Math.random()*10000000000).toString(36)
const SCOPE = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-modify user-library-read"
const AUTH_URL = new URL("https://accounts.spotify.com/authorize")

AUTH_URL.searchParams.append("client_id", CLIENT_ID)
AUTH_URL.searchParams.append("response_type", RESPONSE_TYPE)
AUTH_URL.searchParams.append("redirect_uri", REDIRECT_URI)
//AUTH_URL.searchParams.append("state", STATE)
AUTH_URL.searchParams.append("scope", SCOPE)


export default function Login() {
  return (
    <Link href={AUTH_URL.toString()}>
      Login to Spotify  
    </Link>
  )
}

import Link from 'next/link'
import React from 'react'

const CLIENT_ID = "1080ed0f9ce54d028977b1e993c21bee"
const RESPONSE_TYPE = "code"
const REDIRECT_URI = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN!
const SCOPE = "user-top-read user-read-private"
const AUTH_URL = new URL("https://accounts.spotify.com/authorize")
const GITHUB_LINK = new URL("https://www.github.com/mangogelato")

AUTH_URL.searchParams.append("client_id", CLIENT_ID)
AUTH_URL.searchParams.append("response_type", RESPONSE_TYPE)
AUTH_URL.searchParams.append("redirect_uri", REDIRECT_URI)
AUTH_URL.searchParams.append("scope", SCOPE)



export default function Login() {

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-center pt-40 text-xl'>Music Dashboard</h1>
        <p className='p-10'>This tool can be used to view your most played artists and tracks on Spotify.</p>
        <Link className="grid rounded-xl w-75 h-25 bg-green-500 justify-center items-center justify-self-center" href={AUTH_URL.toString()}>
          Login with Spotify
        </Link>
        <p className='pt-30 pb-7'>My Github Profile</p>
        <Link target="_blank" href={GITHUB_LINK.toString()}>
          <img className="dark:hidden"src="/github-mark.svg" alt="Github Logo" />
          <img className="not-dark:hidden"src="/github-mark-white.svg" alt="Github Logo" />
        </Link>
      </div>
    </>
  )
}

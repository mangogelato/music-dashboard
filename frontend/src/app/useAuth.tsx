// Input: code from Spotify API login callback
// Output: {Access Token, Refresh Token, Access Token expiry timer in seconds}

import axios from "axios"
import { access } from "fs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const LOGIN_LINK = "http://localhost:3001/login"
const REFRESH_LINK = "http://localhost:3001/refresh"



export default function useAuth(code: string) {
    
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState(0)

    function getAccessToken(code: string, link: string) {
        axios.post(link, {
            code: code,
        }).then((res) => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    // Initializing token
    useEffect(() => {
        if (!code) return
        getAccessToken(code, LOGIN_LINK)
        console.log(accessToken)
    }, [code])
    
    // Refreshing token on interval
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            getAccessToken(code, REFRESH_LINK)
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return (accessToken)
}



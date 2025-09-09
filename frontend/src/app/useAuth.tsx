// Input: code from Spotify API login callback
// Output: {Access Token, Refresh Token, Access Token expiry timer in seconds}

import axios from "axios"
import { useState, useEffect } from "react"

const LOGIN_LINK = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/login"
const REFRESH_LINK = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/refresh"





export default function useAuth(code: string) {
    
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState(0)

    function getAccessToken(link: string) {
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
        getAccessToken(LOGIN_LINK)
        console.log(accessToken)
    }, [code])
    
    // Refreshing token on interval
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            getAccessToken(REFRESH_LINK)
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return (accessToken)
}



import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import React from "react"

const LOGIN_LINK = "http://localhost:3001/login"
const REFRESH_LINK = "http://localhost:3001/refresh"

export default function authManager(code: any) {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState("")

    useEffect(() => {
        axios.post(LOGIN_LINK, {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            localStorage.setItem("expiresIn", expiresIn)
            window.history.pushState({}, '', "/")
        }).catch(() => {
            router.push('/')
        })
    }, [code])

    return (accessToken)

    useEffect(() => {}, [refreshToken, expiresIn])
}



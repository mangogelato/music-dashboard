import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const LOGIN_LINK = "http://localhost:3001/login"
const REFRESH_LINK = "http://localhost:3001/refresh"

export default function authManager(code: String) {
    
    const router = useRouter()
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState(0)

    useEffect(() => {
        console.log(code)
        if (!code){
            return
        }
        axios.post(LOGIN_LINK, {
            code: code,
        }).then((res) => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
        })
        .then(() => {
            sessionStorage.setItem("accessToken", accessToken)
            sessionStorage.setItem("refreshToken", refreshToken)
            sessionStorage.setItem("expiresIn", JSON.stringify(expiresIn))
        }).catch((err) => {
            console.log(err)
        })
    }, [code])

    useEffect(() => {
        if (!accessToken || !expiresIn){
            return;
        }
        const timeout = setInterval(() => {
            axios.post(REFRESH_LINK, {
                refreshToken,
            })
            .then((res) => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
            })
            .then(() => {
                sessionStorage.setItem("accessToken", accessToken)
                sessionStorage.setItem("refreshToken", refreshToken)
                sessionStorage.setItem("expiresIn", JSON.stringify(expiresIn))
            })
            .catch((err) => {
                console.log(err)
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(timeout)
        
    }, [refreshToken, expiresIn])
}



import React, { useEffect } from 'react'
import { useState } from 'react'
import authManager from './authManager'


export default function Dashboard(code: any) {
  const [accessToken, setAccessToken] = useState("")

  //authManager(code)

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken") || "")
  },  [])

  return (
    <div>{accessToken}</div>
  )
}

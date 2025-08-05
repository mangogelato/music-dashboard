'use client'

import Image from "next/image";
import Login from "./Login";
import Dashboard from "./Dashboard";
import authManager from './authManager'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { access } from "fs";



export default function Home() {
  const searchParams = useSearchParams();

  const authCallbackCode = searchParams.get('code') || ''
  const accessToken = localStorage.getItem("accessToken")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (authCallbackCode || accessToken) {
      setLoggedIn(true)
    }
  }, [])

  return ( loggedIn ? <Dashboard code={authCallbackCode} /> : <Login />
    
  );
}

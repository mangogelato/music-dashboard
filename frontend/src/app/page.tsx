'use client'

import Image from "next/image";
import Login from "./Login";
import Dashboard from "./Dashboard";
import authManager from "./authManager";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";



export default function Home() {
  const searchParams = useSearchParams();
  
  const authCallbackCode = searchParams.get('code') || ''
  authManager(authCallbackCode)
  
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    
    if (sessionStorage.getItem("accessToken")) {
      setLoggedIn(true)
    }
  }, [authCallbackCode])

  return ( loggedIn ? <Dashboard code={authCallbackCode} /> : <Login />
    
  );
}

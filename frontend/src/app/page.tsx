'use client'

import Image from "next/image";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./useAuth";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";



export default function Home() {
  const searchParams = useSearchParams();

  
  const authCallbackCode = searchParams.get('code') || ''
  const accessToken = useAuth(authCallbackCode)

  return ( 
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950">
      {accessToken ? <Dashboard accessToken={accessToken} /> : <Login />}
    </div>
    
    
  );
}

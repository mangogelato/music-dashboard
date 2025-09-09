'use client'

import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./useAuth";
import { useSearchParams } from "next/navigation";



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

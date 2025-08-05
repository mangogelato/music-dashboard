import React from 'react'
import authManager from './authManager'


export default function Dashboard({code = ''}: {code: String}) {
  const accessToken = authManager(code) 
  return (
    <div>Dashboard</div>
  )
}

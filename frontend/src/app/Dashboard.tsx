import React, { useEffect } from 'react'
import { useState } from 'react'

type DashboardProps = {
  accessToken: string;
};


export default function Dashboard({accessToken}: DashboardProps) {

  return (
    <div>{accessToken}</div>
  )
}

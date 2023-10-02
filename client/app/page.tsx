"use client"
import Image from 'next/image'
import { useEffect } from 'react'
import { getAllApplications } from './rest/apiService'

export default function Home() {

  return (
    <main className="font-mono">
     This is my HomePage
    </main>
  )
}

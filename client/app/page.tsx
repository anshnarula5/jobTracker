"use client"
import Image from 'next/image'
import { useEffect } from 'react'
import { getAllApplications } from './rest/apiService'

export default function Home() {

  return (
    <main className="font-mono text-gray-50 ">
     This is my HomePage
    </main>
  )
}

"use client"
import React from 'react'
import withAuth from '../rest/withAuth'
import Image from 'next/image'

const Summary = () => {
  return (
    <div className='bg-black min-h-screen min-w-full text-white flex justify-center items-center  text-[50px] '>
      Under Construction
    </div>
  )
}

export default withAuth(Summary)
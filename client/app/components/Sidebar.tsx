import React from 'react'
import SidebarButton from './buttons/SidebarButton'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='bg-green-500 basis-1/9 p-4'>
      <h1 className='text-3xl font-bold antialiased'>
      <Link href={"/"}>Job Tracker </Link>
      </h1>
      <div>
        <SidebarButton text = "Dashboard" to = {"/dashboard"} />
        <SidebarButton text = "Summary" to = {"/summary"} />
      </div>
    </div>
  )
}

export default Sidebar
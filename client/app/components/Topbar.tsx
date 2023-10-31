"use client"
import Link from 'next/link'
import React from 'react'
import SidebarButton from './buttons/SidebarButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { redirect } from 'next/navigation'
import { logOut } from '@/redux/features/authSlice'
import { createAlert } from '@/redux/features/alertSlice'
const Topbar = () => {
  const dispatch = useDispatch()
  const handleAlert = () => {
    dispatch(createAlert({message : "Good morning", type : "error"}))
  }
  const isLoggedIn = useSelector((state : any) => state.authReducer.value.authToken)
  const handleLogout = async() => {
    dispatch(logOut())
  }
  if(!isLoggedIn) return
  return (
    <nav className="bg-green-500 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Job Tracker</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
          <SidebarButton text = "Dashboard" to = {"/dashboard"} />
        <SidebarButton text = "Summary" to = {"/summary"} />
        <button className='p-3 bg-sky-800 mx-1' onClick={handleLogout}>
          Logout
        </button>
        <button className='p-3 bg-sky-800 mx-1' onClick={handleAlert}>
          Clicl me
        </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Topbar

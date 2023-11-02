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
    dispatch(createAlert({ message: "Good morning", type: "error" }))
  }
  const isLoggedIn = useSelector((state: any) => state.authReducer.value.authToken)
  const handleLogout = async () => {
    dispatch(logOut())
  }
  return (
    <div className="bg-green-600 p-4 ">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mx-8">
        <div className="flex items-center">
          <Link href="/" className="text-white text-3xl font-bold ">JobPulse
          </Link>
        </div>
        {isLoggedIn ?
          <div className="flex justify-end mt-4 md:mt-0 space-x-4">
            <Link href="/dashboard" className="bg-teal-900 text-white px-4 py-2 rounded">Dashboard
            </Link>
            <Link href="/summary" className="bg-teal-900 text-white px-4 py-2 rounded">Summary
            </Link>
            <Link href="/auth" onClick={handleLogout} className="bg-teal-900 text-white px-4 py-2 rounded">Logout
            </Link>
          </div> : <Link href="/auth" onClick={handleLogout} className="bg-teal-900 text-white px-4 py-2 rounded">Login
          </Link>
        }
      </div>
    </div>
  )
}

export default Topbar

"use client"
import React from 'react'
import StatusCard from '../components/StatusCard'
import { APPLIED, COLD, INTERVIEW, REFERRED, REFREQ,} from '../utils/Constants'

const Dashboard = () => {
  return (
    <div className='flex flex-row space-x-6 px-8 py-3 flex-wrap justify-between items-start'>
       <StatusCard statusName = {COLD} />
        <StatusCard statusName = {REFREQ}  />
        <StatusCard statusName = {REFERRED} />
        <StatusCard statusName = {APPLIED}  />
        <StatusCard statusName = {INTERVIEW}/>
    </div>
  )
}

export default Dashboard
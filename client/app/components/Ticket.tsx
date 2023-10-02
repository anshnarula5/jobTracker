import React from 'react'
import { convertDate } from '../utils'

const Ticket = ({application} : any) => {
  if(application.referralRequested){
    console.log(application.referralRequestDate)
  }
  return (
    <div className='bg-red-100 p-3 my-2 mx-4'>
        <div className='flex justify-between items-center'>
            <span className='block font-sans text-xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{application.companyName}</span>
            <span>{application.jobId}</span>
        </div>
        <div>
            <figcaption className='block font-sans pt-2  leading-normal text-inherit antialiased'>
                {application.applied ? convertDate(application.appliedDate) : 
                application.referralRequested ? convertDate(application.referralRequestDate) :
                application.referred ? convertDate(application.referredDate) :
                ""
                }
            </figcaption>
        </div>
    </div>
  )
}

export default Ticket
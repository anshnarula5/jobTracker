import React from 'react'
import { convertDate } from '../utils'
import Link from 'next/link'

const Ticket = ({ application }: any) => {
  if (application.referralRequested) {
    console.log(application.referralRequestDate)
  }
  return (
    <div className='bg-red-100 p-4 my-3 mx-4 rounded-xl'>
      <Link href={application.jobLink} target='_blank'>
      <div className='flex justify-between items-center'>
        <span className='block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{application.companyName}</span>
        <span>{application.jobId}</span>
      </div>
      <div>
        <figcaption className='font-sans pt-2 antialiased flex items-center text-sm'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <span className='mx-1'>{application.applied ? convertDate(application.appliedDate) :
            application.referralRequested ? convertDate(application.referralRequestDate) :
              application.referred ? convertDate(application.referredDate) :
                ""
          }</span>
        </figcaption>
      </div>
      </Link>
    </div>
  )
}

export default Ticket
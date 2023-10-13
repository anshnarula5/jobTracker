import React from 'react'
import { convertDate } from '../utils'
import Link from 'next/link'
import { Draggable } from '../dashboard/Draggable'
import { deleteApplication } from '../rest/apiService'

const Ticket = ({ application, status, parent }: any) => {
 
  return (
    <Draggable id={application.id} status={status} parent={parent} application={application}>
      <div className='p-3 my-2 rounded-xl bg-slate-900 text-neutral-300 hover:bg-green-600'>
        <div className='flex justify-between items-center py-0.5'>
          <span className='block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{application.companyName}</span>
          <Link href={application.jobId} target='_blank'>
            Open
          </Link>
        
        </div>
        <div className='flex items-center justify-between py-1'>
          <span className='block'>{application.jobId}</span>
          <figcaption className='font-sans pt-2 antialiased flex items-center text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className='mx-1'>{convertDate(application.currentStatusDate)}</span>
           
          </figcaption>
        </div>
      </div>

    </Draggable>
  )
}

export default Ticket
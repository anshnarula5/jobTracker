import React from 'react'
import { convertDate } from '../utils'
import Link from 'next/link'
import { Draggable } from '../dashboard/Draggable'
import { deleteApplication } from '../rest/apiService'

const Ticket = ({ application, status, parent }: any) => {

  return (
    <Draggable id={application.id} status={status} parent={parent} application={application}>
      <div className='px-3 py-2 my-2 rounded-xl bg-slate-900 text-neutral-300 hover:bg-green-600'>
        <div className='flex justify-between items-center '>
          <span className='block font-sans text-xl font-semibold leading-snug tracking-normal text-inherit antialiased'>{application.companyName}</span>
          <Link href={application.jobId} target='_blank' className='px-1 py-2 rounded-lg bg-slate-900 text-slate-500 hover:text-green-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </Link>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='block'>{application.jobId}</span>
          <figcaption className='font-sans pt-2 antialiased flex items-center text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className='mx-1 text-sm'>{convertDate(application.currentStatusDate)}</span>
          </figcaption>
        </div>
      </div>

    </Draggable>
  )
}

export default Ticket
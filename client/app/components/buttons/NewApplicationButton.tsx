import React from 'react'

const NewApplicationButton = ({ handleClick, isFormOpen }: any) => {
  return (
    <button className='text-slate-500 hover:text-green-600 hover:bg-slate-800 px-1 py-2 rounded-lg' onClick={() => handleClick((prev: boolean) => !prev)}>
      {isFormOpen ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> 
        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>}
    </button>
  )
}

export default NewApplicationButton
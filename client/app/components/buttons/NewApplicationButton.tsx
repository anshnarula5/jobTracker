import React from 'react'

const NewApplicationButton = ({ handleClick }: any) => {
  return (
    <button className='' onClick={() => handleClick((prev: boolean) => !prev)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

    </button>
  )
}

export default NewApplicationButton
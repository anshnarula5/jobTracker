import React from 'react'

const SubmitButton = ({handleClick, children} : any) => {
  return (
    <button className='bg-sky-700 p-3 rounded-lg' onClick={handleClick}>
        {children}
    </button>
  )
}

export default SubmitButton
import React from 'react'

const SubmitButton = ({handleClick, children} : any) => {
  return (
    <button className='bg-green-600 p-2 rounded-lg text-black' type='submit'>
        {children}
    </button>
  )
}

export default SubmitButton
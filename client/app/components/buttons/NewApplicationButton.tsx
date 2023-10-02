import React from 'react'

const NewApplicationButton = ({handleClick} : any) => {
  return (
    <button className='bg-sky-200 p-2 rounded-es-2xl' onClick={() => handleClick((prev :boolean) => !prev)}>
        +
    </button>
  )
}

export default NewApplicationButton
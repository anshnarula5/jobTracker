import Link from 'next/link'
import React from 'react'

const SidebarButton = ({ text, to }: any) => {
  return (
    <Link className='p-4 bg-sky-400 block my-4 min-w-full' href={to}>
      {text}
    </Link>
  )
}

export default SidebarButton
import Link from 'next/link'
import React from 'react'

const SidebarButton = ({ text, to }: any) => {
  return (
    <Link className='p-3 bg-sky-800 mx-1 ' href={to}>
      {text}
    </Link>
  )
}

export default SidebarButton
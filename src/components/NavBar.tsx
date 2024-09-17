'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const navs = [
    { label: 'Home', href: '/' },
    { label: 'Todo', href: '/todo' },
    { label: 'Users', href: '/users' },
  ]
  const path = usePathname()

  return (
    <div className='flex gap-4 text-3xl font-bold text-blue-700'>
      {navs.map(nav => 
        <Link 
          key={nav.href} 
          href={nav.href}
          className={`${path === nav.href ? 'bg-blue-700 text-white' : ''}`}
        >
          {nav.label}
        </Link>
      )}
    </div>
  )
}

export default NavBar
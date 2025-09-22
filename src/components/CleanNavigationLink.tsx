'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, MouseEvent } from 'react'

interface CleanNavigationLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function CleanNavigationLink({ 
  href, 
  children, 
  className, 
  onClick 
}: CleanNavigationLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Don't prevent default - let Next.js handle the navigation
    console.log(`🔗 Clean navigation to: ${href}`)
    
    if (onClick) {
      onClick()
    }

    // Add a small delay to allow the navigation to complete
    setTimeout(() => {
      console.log(`✅ Navigation completed to: ${href}`)
    }, 100)
  }

  return (
    <Link 
      href={href}
      className={className}
      onClick={handleClick}
      prefetch={true} // Enable prefetching for faster navigation
    >
      {children}
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname() // Get current pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href.startsWith('#')) return false 
    return pathname === href
  }

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        {/* Left side - Logo and Navigation Menu */}
        <div className="nav-left">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="logo-icon">F</div>
            <span className="logo-text">FlutterCraft</span>
          </Link>

          {/* Desktop Menu - Closer to logo */}
          <div className="nav-menu">
            <Link 
              href="/components" 
              className={`nav-link ${isActiveLink('/components') ? 'active' : ''}`}
            >
              Components
            </Link>
            <Link 
              href="#templates" 
              className={`nav-link ${isActiveLink('/templates') ? 'active' : ''}`}
            >
              Templates
            </Link>
            <Link 
              href="#pricing" 
              className={`nav-link ${isActiveLink('/pricing') ? 'active' : ''}`}
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Right side - CTA Button */}
        <div className="nav-cta">
          <button className="btn-nav-primary" disabled>
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link
            href="/components"
            className={`mobile-nav-link ${isActiveLink('/components') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Components
          </Link>
          <Link
            href="#templates"
            className={`mobile-nav-link ${isActiveLink('/templates') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Templates
          </Link>
          <Link
            href="#pricing"
            className={`mobile-nav-link ${isActiveLink('/pricing') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <button
            className="btn-mobile-primary"
            disabled
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  )
}

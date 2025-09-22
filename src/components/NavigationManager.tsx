'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

let isProcessing = false
let cleanupTimer: NodeJS.Timeout | null = null

export default function NavigationManager() {
  const pathname = usePathname()
  const hasInitialized = useRef(false)
  const lastCleanupPath = useRef('')

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    console.log(`🟢 NavigationManager: Initialized for iframe handling`)

    // ✅ Initial cleanup
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        console.log(`🧹 Initial history cleanup`)
        window.history.replaceState({ clean: true }, '', window.location.href)
      }
    }, 100)

  }, [])

  useEffect(() => {
    // Skip if already processing or same path as last cleanup
    if (isProcessing || pathname === lastCleanupPath.current) {
      return
    }

    console.log(`🧭 Navigation to: ${pathname}`)
    isProcessing = true

    // Clear existing timer
    if (cleanupTimer) {
      clearTimeout(cleanupTimer)
    }

    // ✅ Special handling for iframe-heavy pages
    const isIframePage = pathname.includes('/components/') && pathname.split('/').length === 3

    cleanupTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const historyLength = window.history.length
        console.log(`📊 History length before cleanup: ${historyLength}`)

        // ✅ More aggressive cleanup for iframe pages
        if (isIframePage && historyLength > 3) {
          console.log(`🧹 Iframe page: Aggressive history cleanup`)
          
          // Replace current state multiple times to clean iframe pollution
          for (let i = 0; i < 3; i++) {
            window.history.replaceState(
              { 
                clean: true, 
                path: pathname,
                cleanup: i,
                timestamp: Date.now() 
              }, 
              '', 
              window.location.href
            )
          }
        } else {
          // Normal cleanup for non-iframe pages
          console.log(`🧹 Normal page: Standard cleanup`)
          window.history.replaceState(
            { clean: true, path: pathname }, 
            '', 
            window.location.href
          )
        }

        lastCleanupPath.current = pathname
        console.log(`✅ History cleaned for: ${pathname}`)
      }
      
      isProcessing = false
    }, isIframePage ? 500 : 300) // Longer delay for iframe pages

    return () => {
      if (cleanupTimer) {
        clearTimeout(cleanupTimer)
      }
    }

  }, [pathname])

  // ✅ Additional cleanup for iframe-caused history pollution
  useEffect(() => {
    const handleHistoryPollution = () => {
      if (typeof window !== 'undefined' && window.history.length > 5) {
        console.log(`⚠️ Detected history pollution (${window.history.length} entries)`)
        
        // Emergency cleanup
        setTimeout(() => {
          window.history.replaceState(
            { emergency: true, path: pathname },
            '',
            window.location.href
          )
          console.log(`🚨 Emergency history cleanup performed`)
        }, 200)
      }
    }

    // Check for pollution every 2 seconds
    const pollutionChecker = setInterval(handleHistoryPollution, 2000)
    
    return () => clearInterval(pollutionChecker)
  }, [pathname])

  return null
}

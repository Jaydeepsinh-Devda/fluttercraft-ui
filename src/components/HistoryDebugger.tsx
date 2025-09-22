'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function HistoryDebugger() {
  const [historyLength, setHistoryLength] = useState(0)
  const [currentPath, setCurrentPath] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const updateState = () => {
      if (typeof window !== 'undefined') {
        setHistoryLength(window.history.length)
        setCurrentPath(pathname)
      }
    }

    updateState()
    const interval = setInterval(updateState, 1000)

    return () => clearInterval(interval)
  }, [pathname])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null

  const handleCleanHistory = () => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(
        { clean: true, manual: true }, 
        '', 
        window.location.pathname + window.location.search
      )
      console.log('🧹 Manual history cleanup performed')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 10000,
      fontFamily: 'monospace',
      minWidth: '200px'
    }}>
      <div><strong>🔍 Navigation Debug</strong></div>
      <div>Path: {currentPath}</div>
      <div>History Length: <span style={{color: historyLength > 3 ? '#ff4444' : '#44ff44'}}>{historyLength}</span></div>
      <button 
        onClick={handleCleanHistory}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          marginTop: '8px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        🧹 Clean History
      </button>
    </div>
  )
}

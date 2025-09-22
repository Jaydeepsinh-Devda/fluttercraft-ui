'use client'

import { useState, useEffect } from 'react'
import { getComponents } from '../../lib/database'

interface Stat {
  number: string
  label: string
}

export default function StatsSection() {
  const [componentCount, setComponentCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        // Get actual component count from database
        const components = await getComponents({ status: 'published' })
        setComponentCount(components.length)
      } catch (error) {
        console.error('Error loading stats:', error)
        setComponentCount(50) // Fallback to default
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  // Smart stats with real data
  const stats: Stat[] = [
    { number: isLoading ? "50+" : `${componentCount}+`, label: "Components Ready" },
    { number: "100%", label: "Flutter Compatible" },
    { number: "MIT", label: "Open Source" }
  ]

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

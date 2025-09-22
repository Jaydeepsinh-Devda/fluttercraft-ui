'use client'

import { useState, useEffect } from 'react'
import { getCategoriesWithComponentCounts } from '../../lib/database'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  sort_order: number
  component_count: number
}

export default function ComponentsGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategoriesWithComponentCounts()
        console.log('📊 Categories with counts:', data)
        setCategories(data)
      } catch (error) {
        console.error('❌ Error loading categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Function to format component count
  const formatComponentCount = (count: number) => {
    if (count === 0) return 'Coming Soon'
    if (count === 1) return '1 item'
    return `${count} items`
  }

  // Function to get status text and class
  const getStatus = (count: number) => {
    if (count > 0) {
      return {
        text: 'Available',
        className: 'status-available'
      }
    }
    return {
      text: 'Coming Soon',
      className: 'status-coming-soon'
    }
  }

  if (isLoading) {
    return (
      <section className="components-grid-section">
        <div className="components-container">
          <div className="section-header">
            <h2>Component Categories</h2>
            <p>Loading categories...</p>
          </div>
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="loading-card">
                <div className="loading-icon"></div>
                <div className="loading-text"></div>
                <div className="loading-text short"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="components-grid-section">
      <div className="components-container">
        <div className="section-header">
          <h2>Component Categories</h2>
          <p>Explore our comprehensive collection of Flutter UI components</p>
        </div>

        <div className="components-grid">
          {categories.map((category) => {
            const status = getStatus(category.component_count)

            return (
              <Link
                key={category.id}
                href={`/components/${category.slug}`}
                className="category-card-wrapper"
              >
                <div className="component-category-card">
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-content">
                    <div className="category-header">
                      <h3 className="category-title">{category.name}</h3>
                      <span className="component-count">
                        {formatComponentCount(category.component_count)}
                      </span>
                    </div>
                    <p className="category-description">{category.description}</p>
                    <div className="category-status">
                      <span className={`status-badge ${status.className}`}>
                        {status.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add hover effect indicator */}
                  <div className="card-hover-indicator">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M5 12h14m-7-7l7 7-7 7" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="components-cta">
          <div className="cta-content">
            <h3>Want Early Access?</h3>
            <p>Be the first to know when new components are added</p>
            <button className="btn-primary" disabled>
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

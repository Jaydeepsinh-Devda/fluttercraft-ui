'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface Component {
  id: string
  title: string
  slug: string
  description: string
  iframe_url: string
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  sort_order: number
}

interface CategoryComponentsGridProps {
  category: Category
  components: Component[]
}

export default function CategoryComponentsGrid({ category, components }: CategoryComponentsGridProps) {
  if (components.length === 0) {
    return (
      <section className="category-components-section">
        <div className="category-components-container">
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3 className="empty-title">No Components Yet</h3>
            <p className="empty-description">
              Components for {category.name} are coming soon! We are working hard to bring you amazing Flutter UI components.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="category-components-section">
      <div className="category-components-container">
        <div className="section-header">
          <h2 className="section-title">Available Components</h2>
          <p className="section-subtitle">
            Professional {category.name.toLowerCase()} ready to copy-paste into your Flutter projects
          </p>
        </div>

        <div className="category-components-grid">
          {components.map((component, index) => (
            <ComponentCard
              key={component.id}
              component={component}
              category={category}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ✅ Separate Component Card with Iframe Management
interface ComponentCardProps {
  component: Component
  category: Category
  animationDelay: number
}

function ComponentCard({ component, category, animationDelay }: ComponentCardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    console.log(`🖼️ Setting up iframe for: ${component.title}`)

    const preventIframeNavigation = () => {
      try {
        if (iframe.contentWindow) {
          // Disable Flutter web app routing history
          iframe.contentWindow.history.replaceState = () => {}
          iframe.contentWindow.history.pushState = () => {}
          
          // Override Flutter router if possible
          iframe.contentWindow.addEventListener('popstate', (e) => {
            e.stopPropagation()
            e.preventDefault()
          }, true)
        }
      } catch (error) {
        // Cross-origin restrictions - normal for external iframes
        console.log(`🛡️ Cross-origin iframe: ${component.title}`)
      }
    }

    const handleIframeLoad = () => {
      console.log(`✅ Iframe loaded: ${component.title}`)
      preventIframeNavigation()
      
      // Clean any history pollution caused by iframe
      setTimeout(() => {
        if (window.history.length > 3) {
          console.log(`🧹 Cleaning iframe-caused history pollution`)
          window.history.replaceState(null, '', window.location.href)
        }
      }, 100)
    }

    iframe.addEventListener('load', handleIframeLoad)
    
    return () => {
      iframe.removeEventListener('load', handleIframeLoad)
    }
  }, [component.title])

  return (
    <Link
      href={`/components/${category.slug}/${component.slug}`}
      className="component-card-link"
    >
      <div
        className="component-card"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        <div className="component-preview">
          <iframe
            ref={iframeRef}
            src={component.iframe_url}
            width="100%"
            height="100%"
            title={`${component.title} Preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{
              border: 'none',
              pointerEvents: 'none', // Prevent interaction that could cause navigation
            }}
          />

          <div className="component-overlay">
            <div className="component-info">
              <h3 className="component-name">{component.title}</h3>
              <p className="component-description">{component.description}</p>
              <div className="view-component-btn">
                <span>View Component</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          </div>
        </div>
      </div>
    </Link>
  )
}

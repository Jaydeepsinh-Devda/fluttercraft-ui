'use client'

import { useEffect } from 'react'
import CategoryComponentsGrid from '../../../components/layout/CategoryComponentsGrid'
import Link from 'next/link'

interface Component {
    id: string
    title: string
    slug: string
    description: string
    iframe_url: string
    status: string
    created_at: string
    updated_at: string
}

interface Category {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    color: string
    sort_order: number
}

interface CategoryPageClientProps {
    category: Category
    components: Component[]
}

// Client Component (handles client-side logic and rendering)
export default function CategoryPageClient({ category, components }: CategoryPageClientProps) {

    useEffect(() => {
        console.log(`📂 Category page rendered: ${category.name}`)
    }, [category.name])

    return (
        <main className="category-page">
            {/* Dynamic Category Header */}
            <section className="category-hero-section">
                <div className="category-hero-container">
                    <div className="category-hero-content">
                        <div className="category-hero-icon">
                            {category.icon}
                        </div>
                        <div className="category-hero-text">
                            <h1 className="category-hero-title">
                                {category.name}
                            </h1>
                            <p className="category-hero-description">
                                {category.description}
                            </p>
                            <div className="category-hero-stats">
                                <div className="category-stat">
                                    <span className="stat-number">{components.length}</span>
                                    <span className="stat-label">Components</span>
                                </div>
                                <div className="category-stat">
                                    <span className="stat-number">{components.length > 0 ? '100%' : '0%'}</span>
                                    <span className="stat-label">Ready to Use</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {components.length === 0 ? (
                <section className="category-components-section">
                    <div className="category-components-container">
                        <div className="empty-state">
                            <div className="empty-icon">🚧</div>
                            <h3 className="empty-title">Components Coming Soon!</h3>
                            <p className="empty-description">
                                We're working hard to bring you amazing {category.name.toLowerCase()} components.
                                Check back soon for updates!
                            </p>
                            <div className="empty-actions">
                                <Link href="/components" className="btn-secondary">
                                    ← Back to Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <CategoryComponentsGrid
                    category={category}
                    components={components}
                />
            )}
        </main>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { getComponents, getCategories } from '../../lib/database'

interface ComponentStats {
    componentCount: number
    categoryCount: number
    isLoading: boolean
}

export default function ComponentsHeader() {
    const [stats, setStats] = useState<ComponentStats>({
        componentCount: 0,
        categoryCount: 0,
        isLoading: true
    })

    useEffect(() => {
        async function loadStats() {
            try {
                // Get real data from database
                const [components, categories] = await Promise.all([
                    getComponents({ status: 'published' }),
                    getCategories()
                ])

                setStats({
                    componentCount: components.length,
                    categoryCount: categories.length,
                    isLoading: false
                })
            } catch (error) {
                console.error('Error loading component stats:', error)
                // Fallback to default numbers
                setStats({
                    componentCount: 20,
                    categoryCount: 6,
                    isLoading: false
                })
            }
        }

        loadStats()
    }, [])

    return (
        <section className="components-header">
            <div className="components-header-container">
                <div className="components-header-content">
                    <div className="coming-soon-badge">
                        🚀 Coming Soon
                    </div>

                    <h1 className="components-title">
                        Flutter Components
                    </h1>

                    <p className="components-subtitle">
                        Professional UI components built for Flutter developers who demand excellence
                    </p>

                    <p className="components-description">
                        Our comprehensive component library includes everything you need to build beautiful,
                        performant Flutter applications. From basic buttons to complex data visualizations.
                    </p>

                    <div className="components-stats">
                        <div className="stat">
                            <div className="stat-number">
                                {stats.isLoading ? "50+" : `${stats.componentCount}+`}
                            </div>
                            <div className="stat-label">Components</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">
                                {stats.isLoading ? "6" : stats.categoryCount.toString()}
                            </div>
                            <div className="stat-label">Categories</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Flutter Compatible</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

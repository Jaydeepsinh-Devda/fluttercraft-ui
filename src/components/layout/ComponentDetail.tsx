'use client'

import { useState } from 'react'
import CodeEditor from './CodeEditor'
import PhoneMockup from './PhoneMockup'
import { parseCodeData } from '../../lib/database'
import Link from 'next/link'

interface Component {
    id: string
    title: string
    slug: string
    description: string
    iframe_url: string
    code_data: any
    categories?: {
        name: string
        slug: string
        icon: string
    }
}

interface ComponentDetailProps {
    component: Component
}

export default function ComponentDetail({ component }: ComponentDetailProps) {
    const [copySuccess, setCopySuccess] = useState(false)

    // Parse the code data safely
    const codeData = parseCodeData(component.code_data)
    const dartCode = codeData?.dart_code || '// Code not available'

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(dartCode)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    return (
        <div className="component-detail-page">
            {/* Header */}
            <header className="component-detail-header">
                <div className="header-container">
                    <div className="breadcrumb">
                        <Link href="/components" className="breadcrumb-item">Components</Link>
                        <span className="breadcrumb-separator">/</span>
                        <Link href={`/components/${component.categories?.slug}`} className="breadcrumb-item">
                            {component.categories?.name || 'Component'}
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{component.title}</span>
                    </div>

                    <div className="component-header-info">
                        <h1 className="component-title">{component.title}</h1>
                        <p className="component-description">{component.description}</p>
                    </div>
                </div>
            </header>

            {/* Main Content - Split Layout */}
            <main className="component-detail-main">
                <div className="detail-container">

                    {/* Left Side - Code Editor */}
                    <div className="code-section">
                        <div className="code-header">
                            <div className="code-info">
                                <h2 className="code-title">Flutter Code</h2>
                                <p className="code-subtitle">Ready to copy-paste into your project</p>
                            </div>

                            <button
                                onClick={handleCopyCode}
                                className={`copy-button ${copySuccess ? 'copied' : ''}`}
                            >
                                {copySuccess ? (
                                    <>
                                        <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"
                                                stroke="currentColor" strokeWidth="2" fill="none" />
                                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                                                stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                        Copy Code
                                    </>
                                )}
                            </button>
                        </div>

                        <CodeEditor code={dartCode} />
                    </div>

                    {/* Right Side - Phone Mockup */}
                    <div className="preview-section">
                        <div className="preview-header">
                            <h2 className="preview-title">Live Preview</h2>
                            <div className="device-label">iPhone 16 Pro</div>
                        </div>

                        <PhoneMockup
                            iframeUrl={component.iframe_url}
                            componentTitle={component.title}
                        />
                    </div>

                </div>
            </main>
        </div>
    )
}

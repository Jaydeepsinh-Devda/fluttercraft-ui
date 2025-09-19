'use client'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            🚀 Coming Soon
          </div>

          <h1 className="hero-title">
            UI components that code like you do.
          </h1>

          <p className="hero-subtitle">
            A developer-friendly Flutter component library built for speed, flexibility, and clean code.
          </p>

          <p className="hero-description">
            Stop reinventing UI — start building apps that scale.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" disabled>
              View Components
            </button>
          </div>
        </div>

        {/* Right side Flutter component showcase */}
        <div className="hero-visual">
          <div className="flutter-mockup">
            {/* Mobile Frame */}
            <div className="mobile-frame">
              {/* Status Bar */}
              <div className="status-bar">
                <div className="status-left">
                  <span className="time">9:41</span>
                </div>
                <div className="status-right">
                  <div className="battery"></div>
                  <div className="wifi"></div>
                  <div className="signal"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="app-content">
    
                {/* Components Showcase */}
                <div className="components-showcase">
                  <div className="component-item button-comp">
                    <div className="comp-label">Buttons</div>
                    <div className="comp-preview">
                      <div className="sample-button primary"></div>
                      <div className="sample-button secondary"></div>
                    </div>
                  </div>

                  <div className="component-item card-comp">
                    <div className="comp-label">Cards</div>
                    <div className="comp-preview">
                      <div className="sample-card">
                        <div className="card-header"></div>
                        <div className="card-body">
                          <div className="card-line"></div>
                          <div className="card-line short"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="component-item input-comp">
                    <div className="comp-label">Inputs</div>
                    <div className="comp-preview">
                      <div className="sample-input">
                        <div className="input-label"></div>
                        <div className="input-field"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                  <div className="nav-item active"></div>
                  <div className="nav-item"></div>
                  <div className="nav-item"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="floating-element element-1">
              <div className="element-icon">🎨</div>
            </div>
            <div className="floating-element element-2">
              <div className="element-icon">⚡</div>
            </div>
            <div className="floating-element element-3">
              <div className="element-icon">🛠️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

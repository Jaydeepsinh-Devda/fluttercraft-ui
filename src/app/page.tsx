export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Flutter UI Component Library
        </h1>
        <p className="subtitle">
          Coming Soon
        </p>
        <div className="description">
          <p>Professional, customizable UI components for Flutter developers.</p>
          <p>Built with performance and developer experience in mind.</p>
        </div>
        
        {/* Optional: Add some additional elements */}
        <div className="features">
          <div className="feature">
            <h3>🎨 Beautiful Design</h3>
            <p>Carefully crafted components with modern aesthetics</p>
          </div>
          <div className="feature">
            <h3>⚡ High Performance</h3>
            <p>Optimized for speed and smooth animations</p>
          </div>
          <div className="feature">
            <h3>🔧 Developer Friendly</h3>
            <p>Easy to integrate with comprehensive documentation</p>
          </div>
        </div>
      </main>
    </div>
  )
}

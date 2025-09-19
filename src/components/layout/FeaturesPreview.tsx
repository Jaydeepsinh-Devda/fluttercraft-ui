export default function FeaturesPreview() {
  const features = [
    {
      icon: "📦",
      title: "Production-Ready Components",
      description: "Pre-built buttons, forms, navigation, charts, and more — all following Material and Cupertino guidelines."
    },
    {
      icon: "⚡",
      title: "High-Performance Widgets",
      description: "Optimized for smooth 60fps animations and transitions, so your apps feel fast, fluid, and reliable."
    },
    {
      icon: "🛠️",
      title: "Built for Developers",
      description: "Easy to integrate, fully customizable, with clean documentation — spend less time tweaking UI, more time building features."
    }
  ]


  return (
    <section className="features-preview">
      <div className="container">
        <h2 className="section-title">What's Coming</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

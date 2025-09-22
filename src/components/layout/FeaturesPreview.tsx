export default function FeaturesPreview() {
const features = [
  {
    icon: "📦",
    title: "Ready-to-Use UI Components",
    description: "Browse 20+ Flutter UI elements — from buttons to dashboards — and copy-paste them directly into your project."
  },
  {
    icon: "⚡",
    title: "Download With State Management",
    description: "Choose your preferred setup (Provider, Riverpod, Bloc, GetX, etc.) and download a ZIP instantly ready to run."
  },
  {
    icon: "🚀",
    title: "Save Time, Ship Faster",
    description: "Skip repetitive UI coding. Focus on building features while we handle the boilerplate for you."
  }
]


  return (
    <section className="features-preview">
      <div className="container">
        <h2 className="section-title">What&apos;s Coming</h2>
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

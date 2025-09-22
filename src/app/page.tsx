import Navigation from '../components/layout/Navigation'
import HeroSection from '../components/layout/HeroSection'
import StatsSection from '../components/layout/StatsSection'
import FeaturesPreview from '../components/layout/FeaturesPreview'
import Footer from '../components/layout/Footer'


export default function Home() {
  return (
    <div className="page-container">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesPreview />
      <Footer />
    </div>
  )
}

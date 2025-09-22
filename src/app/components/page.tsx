import Navigation from '../../components/layout/Navigation'
import ComponentsHeader from '../../components/layout/ComponentsHeader'
import ComponentsGrid from '../../components/layout/ComponentsGrid'
import Footer from '../../components/layout//Footer'

export default function ComponentsPage() {
  return (
    <div className="page-container">
      <Navigation />
      <ComponentsHeader />
      <ComponentsGrid />
      <Footer />
    </div>
  )
}

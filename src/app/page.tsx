import Header from '@/components/layout/Header'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to FlutterCraft UI
        </h2>
        <p className="text-gray-600">
          Your comprehensive Flutter UI component library
        </p>
      </div>
    </main>
  )
}

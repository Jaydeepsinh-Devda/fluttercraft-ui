import { notFound } from 'next/navigation'
import { getCategoryBySlug, getComponentsByCategorySlug } from '../../../lib/database'
import CategoryPageClient from './CategoryPageClient'

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Server Component (handles data fetching and metadata)
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  try {
    // Get category info and components in parallel
    const [category, components] = await Promise.all([
      getCategoryBySlug(categorySlug),
      getComponentsByCategorySlug(categorySlug)
    ])

    // Show 404 if category doesn't exist
    if (!category) {
      notFound()
    }

    console.log(`✅ Found ${components.length} components for category: ${category.name}`)

    // Pass data to client component
    return <CategoryPageClient category={category} components={components} />
  } catch (error) {
    console.error('❌ Error loading category page:', error)
    notFound()
  }
}

// Generate metadata for SEO (Server Component only)
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params; 
  
  try {
    const category = await getCategoryBySlug(categorySlug);

    if (!category) {
      return {
        title: 'Category Not Found - FlutterCraft',
      };
    }

    return {
      title: `${category.name} - Flutter Components`,
      description: `${category.description} - Professional Flutter UI components ready to copy-paste.`,
      keywords: `Flutter, ${category.name}, UI Components, Dart, Mobile`,
    };
  } catch (error) {
    return {
      title: 'Category Error - FlutterCraft',
    };
  }
}

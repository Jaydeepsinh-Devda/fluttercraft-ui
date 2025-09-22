import { notFound } from 'next/navigation'
import { getCategoryBySlug, getComponentBySlugInCategory } from '../../../../lib/database'
import ComponentDetail from '../../../../components/layout/ComponentDetail'

interface ComponentPageProps {
  params: {
    category: string
    component: string
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { category: categorySlug, component: componentSlug } = await params;
  
  try {
    // Get component and category info
    const [component, category] = await Promise.all([
      getComponentBySlugInCategory(componentSlug, categorySlug),
      getCategoryBySlug(categorySlug)
    ])

    if (!component || !category) {
      notFound()
    }

    // Add category info to component
    const componentWithCategory = {
      ...component,
      categories: category
    }

    return <ComponentDetail component={componentWithCategory} />
  } catch (error) {
    console.error('Error loading component:', error)
    notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ComponentPageProps) {
  const { category: categorySlug, component: componentSlug } = await params;
  
  try {
    const component = await getComponentBySlugInCategory(componentSlug, categorySlug);

    if (!component) {
      return {
        title: 'Component Not Found - FlutterCraft',
      }
    }

    return {
      title: `${component.title} - Flutter Component`,
      description: component.description,
      keywords: `Flutter, ${component.title}, UI Component, Dart`,
    }
  } catch (error) {
    return {
      title: 'Component Error - FlutterCraft',
    };
  }
}

import { supabase } from './supabase'

// Get categories for navigation and components page
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}


// Get components with optional filtering
export async function getComponents(options: {
  categorySlug?: string
  limit?: number
  status?: string
} = {}) {
  try {
    let query = supabase
      .from('components')
      .select(`
        *,
        categories (
          name,
          slug,
          icon
        )
      `)
    
    if (options.categorySlug) {
      query = query.eq('categories.slug', options.categorySlug)
    }
    
    if (options.status) {
      query = query.eq('status', options.status)
    } else {
      query = query.eq('status', 'published') // Only published components
    }
    
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching components:', error)
    return []
  }
}

// Track analytics events (component views, downloads, etc.)
export async function trackEvent(eventType: string, entityType?: string, entityId?: string, eventData: unknown = {}) {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        entity_type: entityType,
        entity_id: entityId,
        event: eventData,
        session_id: 'anonymous' // For now, later can be user session
      })
    
    if (error) throw error
  } catch (error) {
    console.error('Error tracking event:', error)
    // Don't fail the main operation if analytics fails
  }
}

// Increment component view count
export async function incrementComponentViews(componentId: string) {
  try {
    const { error } = await supabase.rpc('increment_component_views', {
      component_uuid: componentId
    })
    
    if (error) throw error
  } catch (error) {
    console.error('Error incrementing component views:', error)
  }
}

// ===== NEW FUNCTIONS FOR COMPONENTS INTEGRATION =====

// Get single component by slug (needed for component detail pages)
export async function getComponentBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('components')
      .select(`
        *,
        categories (
          name,
          slug,
          icon
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - component not found
        return null
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching component by slug:', error)
    return null
  }
}

export function parseCodeData(codeData: unknown) {
  try {
    if (typeof codeData === 'string') {
      return JSON.parse(codeData)
    }
    return codeData
  } catch (error) {
    console.error('Error parsing code ', error)
    return null
  }
}

// Track when someone copies component code (for analytics)
export async function trackComponentCopy(componentId: string, componentSlug: string) {
  try {
    await trackEvent('component_copy', 'component', componentId, {
      component_slug: componentSlug,
      action: 'copy_code',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking component copy:', error)
    // Don't fail the main operation if analytics fails
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No category found
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
}

// Get components by category slug
export async function getComponentsByCategorySlug(categorySlug: string) {
  try {
    // First get the category ID from the category slug
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (categoryError || !category) {
      console.error('Category not found for slug:', categorySlug)
      return []
    }

    // Then get components using the category ID
    const { data, error } = await supabase
      .from('components')
      .select(`
        id,
        title,
        slug,
        description,
        iframe_url,
        status,
        created_at,
        updated_at
      `)
      .eq('status', 'published')
      .eq('category_id', category.id)  // Use category_id instead of category_slug
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error fetching components by category:', error)
    return []
  }
}


// Alternative if you have category_id instead of category_slug
export async function getComponentsByCategoryId(categoryId: string) {
  try {
    const { data, error } = await supabase
      .from('components')
      .select(`
        id,
        title,
        slug,
        description,
        iframe_url,
        status,
        created_at,
        updated_at
      `)
      .eq('status', 'published')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error fetching components by category ID:', error)
    return []
  }
}

// Get component by slug within a specific category
export async function getComponentBySlugInCategory(componentSlug: string, categorySlug: string) {
  try {
    const { data, error } = await supabase
      .from('components')
      .select(`
        *,
        categories!inner (
          name,
          slug,
          icon
        )
      `)
      .eq('slug', componentSlug)
      .eq('categories.slug', categorySlug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No component found
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching component by slug in category:', error)
    return null
  }
}

export async function getCategoriesWithComponentCounts() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order,
        is_active,
        components:components(count)
      `)
      .eq('is_active', true)
      .eq('components.status', 'published')
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Transform the data to include component counts
    const categoriesWithCounts = (data || []).map(category => ({
      ...category,
      component_count: category.components?.[0]?.count || 0
    }))

    return categoriesWithCounts
  } catch (error) {
    console.error('Error fetching categories with counts:', error)
    return []
  }
}
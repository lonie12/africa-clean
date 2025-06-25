/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Blog post types for TypeScript
export type BlogPost = {
  id: string
  title: string
  content: string
  excerpt: string | null
  image_url: string | null
  status: 'draft' | 'published'
  author_id: string | null
  author_name: string
  tags: string[]
  slug: string
  created_at: string
  updated_at: string
  published_at: string | null
}

export type CreateBlogPost = Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'published_at' | 'author_id'> & {
  author_id?: string
}

export type UpdateBlogPost = Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>

// Helper function to handle Supabase errors
const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Error in ${operation}:`, error);
  
  if (error?.code === 'PGRST116') {
    throw new Error(`No data found for ${operation}`);
  }
  
  if (error?.code === 'PGRST301') {
    throw new Error(`Invalid request for ${operation}`);
  }
  
  if (error?.message?.includes('JWT')) {
    throw new Error('Authentication session expired. Please log in again.');
  }
  
  if (error?.message?.includes('timeout')) {
    throw new Error(`Request timeout for ${operation}. Please try again.`);
  }
  
  throw new Error(error?.message || `Failed to ${operation}`);
};

// Blog management functions

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Get all blog posts (with optional status filter)
export const getBlogPosts = async (status?: 'draft' | 'published'): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      handleSupabaseError(error, 'fetch blog posts');
    }

    return data || []
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Get published blog posts for public view (no auth required)
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  return getBlogPosts('published')
}

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      handleSupabaseError(error, 'fetch blog post');
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Get a single blog post by slug (for public blog detail page)
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      handleSupabaseError(error, 'fetch blog post by slug');
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

// Create a new blog post (admin only)
export const createBlogPost = async (post: CreateBlogPost): Promise<BlogPost> => {
  try {
    // Get current user with timeout
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      handleSupabaseError(userError, 'get current user');
    }

    if (!user) {
      throw new Error('Authentication required to create blog post');
    }
    
    const postData = {
      ...post,
      author_id: user.id,
      slug: generateSlug(post.title)
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error, 'create blog post');
    }

    return data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

// Update a blog post (admin only)
export const updateBlogPost = async (id: string, updates: UpdateBlogPost): Promise<BlogPost> => {
  try {
    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('Authentication required to update blog post');
    }

    // Generate new slug if title is being updated
    const updateData = {
      ...updates,
      ...(updates.title && { slug: generateSlug(updates.title) })
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error, 'update blog post');
    }

    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

// Delete a blog post (admin only)
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('Authentication required to delete blog post');
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      handleSupabaseError(error, 'delete blog post');
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

// Publish a blog post (admin only)
export const publishBlogPost = async (id: string): Promise<BlogPost> => {
  return updateBlogPost(id, { 
    status: 'published',
    published_at: new Date().toISOString()
  })
}

// Unpublish a blog post (admin only)
export const unpublishBlogPost = async (id: string): Promise<BlogPost> => {
  return updateBlogPost(id, { 
    status: 'draft',
    published_at: null
  })
}

// Search blog posts (public - only searches published posts)
export const searchBlogPosts = async (query: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let searchQuery = supabase
      .from('blog_posts')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    // For public search, only show published posts unless explicitly requested
    if (!includeUnpublished) {
      searchQuery = searchQuery.eq('status', 'published')
    }

    const { data, error } = await searchQuery

    if (error) {
      handleSupabaseError(error, 'search blog posts');
    }

    return data || []
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

// Get blog posts by tag (public - only published posts)
export const getBlogPostsByTag = async (tag: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .contains('tags', [tag])
      .order('created_at', { ascending: false })

    // For public view, only show published posts unless explicitly requested
    if (!includeUnpublished) {
      query = query.eq('status', 'published')
    }

    const { data, error } = await query

    if (error) {
      handleSupabaseError(error, 'fetch blog posts by tag');
    }

    return data || []
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}

// Get all unique tags from published posts (public)
export const getBlogTags = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags')
      .eq('status', 'published')

    if (error) {
      handleSupabaseError(error, 'fetch blog tags');
    }

    // Flatten and deduplicate tags
    const allTags = data?.flatMap(post => post.tags || []) || []
    return Array.from(new Set(allTags))
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}
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

// Auth types for TypeScript
export type AuthUser = {
  id: string
  email: string
  name?: string
  avatar_url?: string
  role?: 'admin' | 'user'
}

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

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Helper function to create or update user profile
export const upsertUserProfile = async (profile: {
  id: string
  email: string
  name?: string
  avatar_url?: string
  role?: string
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single()
  
  if (error) {
    console.error('Error upserting user profile:', error)
    throw error
  }
  
  return data
}

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
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }

  return data || []
}

// Get published blog posts for public view
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  return getBlogPosts('published')
}

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }

  return data
}

// Create a new blog post
export const createBlogPost = async (post: CreateBlogPost): Promise<BlogPost> => {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  const postData = {
    ...post,
    author_id: user?.id || null,
    slug: generateSlug(post.title)
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(postData)
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    throw error
  }

  return data
}

// Update a blog post
export const updateBlogPost = async (id: string, updates: UpdateBlogPost): Promise<BlogPost> => {
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
    console.error('Error updating blog post:', error)
    throw error
  }

  return data
}

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

// Publish a blog post
export const publishBlogPost = async (id: string): Promise<BlogPost> => {
  return updateBlogPost(id, { status: 'published' })
}

// Unpublish a blog post (set to draft)
export const unpublishBlogPost = async (id: string): Promise<BlogPost> => {
  return updateBlogPost(id, { status: 'draft' })
}

// Search blog posts
export const searchBlogPosts = async (query: string, status?: 'draft' | 'published'): Promise<BlogPost[]> => {
  let searchQuery = supabase
    .from('blog_posts')
    .select('*')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (status) {
    searchQuery = searchQuery.eq('status', status)
  }

  const { data, error } = await searchQuery

  if (error) {
    console.error('Error searching blog posts:', error)
    throw error
  }

  return data || []
}

// Get blog posts by tag
export const getBlogPostsByTag = async (tag: string, status?: 'draft' | 'published'): Promise<BlogPost[]> => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .contains('tags', [tag])
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog posts by tag:', error)
    throw error
  }

  return data || []
}

// Get all unique tags from published posts
export const getBlogTags = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching blog tags:', error)
    throw error
  }

  // Flatten and deduplicate tags
  const allTags = data?.flatMap(post => post.tags || []) || []
  return Array.from(new Set(allTags))
}
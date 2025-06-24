// src/context/blog-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  getBlogPosts,
  getPublishedBlogPosts,
  getBlogPostBySlug,
  createBlogPost as createBlogPostApi,
  updateBlogPost as updateBlogPostApi,
  deleteBlogPost as deleteBlogPostApi,
  publishBlogPost as publishBlogPostApi,
  unpublishBlogPost as unpublishBlogPostApi,
  searchBlogPosts,
  getBlogPostsByTag,
  getBlogTags,
  type BlogPost as SupabaseBlogPost,
  type CreateBlogPost,
  type UpdateBlogPost,
} from "../lib/supabase";

// Convert Supabase blog post to frontend format
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  authorId?: string;
  tags: string[];
  slug: string;
}

const convertSupabaseBlogPost = (post: SupabaseBlogPost): BlogPost => ({
  id: post.id,
  title: post.title,
  content: post.content,
  excerpt: post.excerpt || "",
  imageUrl: post.image_url || undefined,
  status: post.status,
  createdAt: new Date(post.created_at),
  updatedAt: new Date(post.updated_at),
  publishedAt: post.published_at ? new Date(post.published_at) : undefined,
  author: post.author_name,
  authorId: post.author_id || undefined,
  tags: post.tags || [],
  slug: post.slug,
});

const convertToCreateBlogPost = (
  post: Omit<
    BlogPost,
    "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"
  > & { slug: string }
): CreateBlogPost => ({
  title: post.title,
  content: post.content,
  excerpt: post.excerpt,
  image_url: post.imageUrl || null,
  status: post.status,
  author_name: post.author,
  tags: post.tags,
  slug: post.slug,
});

const convertToUpdateBlogPost = (post: Partial<BlogPost>): UpdateBlogPost => ({
  ...(post.title && { title: post.title }),
  ...(post.content && { content: post.content }),
  ...(post.excerpt !== undefined && { excerpt: post.excerpt }),
  ...(post.imageUrl !== undefined && { image_url: post.imageUrl }),
  ...(post.status && { status: post.status }),
  ...(post.author && { author_name: post.author }),
  ...(post.tags && { tags: post.tags }),
});

export interface BlogContextType {
  posts: BlogPost[];
  publishedPosts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  createPost: (
    post: Omit<
      BlogPost,
      "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"
    >
  ) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => Promise<BlogPost | null>;
  publishPost: (id: string) => Promise<void>;
  unpublishPost: (id: string) => Promise<void>;
  searchPosts: (query: string) => Promise<BlogPost[]>;
  getPostsByTag: (tag: string) => Promise<BlogPost[]>;
  getAllTags: () => Promise<string[]>;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load posts from Supabase
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [allPostsData, publishedPostsData] = await Promise.all([
        getBlogPosts(),
        getPublishedBlogPosts(),
      ]);

      const convertedPosts = allPostsData.map(convertSupabaseBlogPost);
      const convertedPublishedPosts = publishedPostsData.map(
        convertSupabaseBlogPost
      );

      setPosts(convertedPosts);
      setPublishedPosts(convertedPublishedPosts);
    } catch (err) {
      console.error("Error loading blog posts:", err);
      setError("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async (
    postData: Omit<
      BlogPost,
      "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"
    >
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const createData = convertToCreateBlogPost({ ...postData, slug });
      const createdPost = await createBlogPostApi(createData);
      const convertedPost = convertSupabaseBlogPost(createdPost);

      setPosts((prev) => [convertedPost, ...prev]);

      // Update published posts if the new post is published
      if (convertedPost.status === "published") {
        setPublishedPosts((prev) => [convertedPost, ...prev]);
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError("Failed to create blog post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (
    id: string,
    updatedData: Partial<BlogPost>
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const updateData = convertToUpdateBlogPost(updatedData);
      const updatedPost = await updateBlogPostApi(id, updateData);
      const convertedPost = convertSupabaseBlogPost(updatedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? convertedPost : post))
      );

      // Update published posts
      if (convertedPost.status === "published") {
        setPublishedPosts((prev) => {
          const existingIndex = prev.findIndex((p) => p.id === id);
          if (existingIndex >= 0) {
            return prev.map((post) => (post.id === id ? convertedPost : post));
          } else {
            return [convertedPost, ...prev];
          }
        });
      } else {
        // Remove from published posts if it's no longer published
        setPublishedPosts((prev) => prev.filter((post) => post.id !== id));
      }
    } catch (err) {
      console.error("Error updating blog post:", err);
      setError("Failed to update blog post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await deleteBlogPostApi(id);

      setPosts((prev) => prev.filter((post) => post.id !== id));
      setPublishedPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getPost = (id: string): BlogPost | undefined => {
    return posts.find((post) => post.id === id);
  };

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const post = await getBlogPostBySlug(slug);
      return post ? convertSupabaseBlogPost(post) : null;
    } catch (err) {
      console.error("Error fetching blog post by slug:", err);
      return null;
    }
  };

  const publishPost = async (id: string): Promise<void> => {
    try {
      const publishedPost = await publishBlogPostApi(id);
      const convertedPost = convertSupabaseBlogPost(publishedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? convertedPost : post))
      );

      setPublishedPosts((prev) => {
        const existingIndex = prev.findIndex((p) => p.id === id);
        if (existingIndex >= 0) {
          return prev.map((post) => (post.id === id ? convertedPost : post));
        } else {
          return [convertedPost, ...prev];
        }
      });
    } catch (err) {
      console.error("Error publishing blog post:", err);
      setError("Failed to publish blog post");
      throw err;
    }
  };

  const unpublishPost = async (id: string): Promise<void> => {
    try {
      const unpublishedPost = await unpublishBlogPostApi(id);
      const convertedPost = convertSupabaseBlogPost(unpublishedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? convertedPost : post))
      );

      setPublishedPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error unpublishing blog post:", err);
      setError("Failed to unpublish blog post");
      throw err;
    }
  };

  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    try {
      const searchResults = await searchBlogPosts(query, "published");
      return searchResults.map(convertSupabaseBlogPost);
    } catch (err) {
      console.error("Error searching blog posts:", err);
      return [];
    }
  };

  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    try {
      const tagResults = await getBlogPostsByTag(tag, "published");
      return tagResults.map(convertSupabaseBlogPost);
    } catch (err) {
      console.error("Error fetching blog posts by tag:", err);
      return [];
    }
  };

  const getAllTags = async (): Promise<string[]> => {
    try {
      return await getBlogTags();
    } catch (err) {
      console.error("Error fetching blog tags:", err);
      return [];
    }
  };

  const refreshPosts = async (): Promise<void> => {
    await loadPosts();
  };

  const value: BlogContextType = {
    posts,
    publishedPosts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPostBySlug,
    publishPost,
    unpublishPost,
    searchPosts,
    getPostsByTag,
    getAllTags,
    refreshPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// src/context/blog-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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
import { useAuth } from "./auth-context";

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
  // Public data (always available)
  publishedPosts: BlogPost[];
  isLoadingPublished: boolean;
  publicError: string | null;

  // Admin data (only available when authenticated)
  posts: BlogPost[];
  isLoadingAdmin: boolean;
  adminError: string | null;

  // Public methods (no auth required)
  getPostBySlug: (slug: string) => Promise<BlogPost | null>;
  searchPublishedPosts: (query: string) => Promise<BlogPost[]>;
  getPublishedPostsByTag: (tag: string) => Promise<BlogPost[]>;
  getPublishedTags: () => Promise<string[]>;
  refreshPublishedPosts: () => Promise<void>;

  // Admin methods (auth required)
  createPost: (
    post: Omit<
      BlogPost,
      "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"
    >
  ) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  publishPost: (id: string) => Promise<void>;
  unpublishPost: (id: string) => Promise<void>;
  searchAllPosts: (query: string) => Promise<BlogPost[]>;
  refreshAllPosts: () => Promise<void>;
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
  const { isAuthenticated } = useAuth();

  // Public state (always loaded)
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [isLoadingPublished, setIsLoadingPublished] = useState(true);
  const [publicError, setPublicError] = useState<string | null>(null);

  // Admin state (only loaded when authenticated)
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Load published posts (public - always available)
  const loadPublishedPosts = useCallback(async () => {
    try {
      setIsLoadingPublished(true);
      setPublicError(null);

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 15000)
      );

      const dataPromise = getPublishedBlogPosts();
      const publishedPostsData = (await Promise.race([
        dataPromise,
        timeoutPromise,
      ])) as SupabaseBlogPost[];

      const convertedPublishedPosts = publishedPostsData.map(
        convertSupabaseBlogPost
      );

      setPublishedPosts(convertedPublishedPosts);
    } catch (err) {
      console.error("Error loading published blog posts:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load published blog posts";
      setPublicError(errorMessage);
      setPublishedPosts([]);
    } finally {
      setIsLoadingPublished(false);
    }
  }, []);

  // Load all posts (admin only)
  const loadAllPosts = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoadingAdmin(true);
      setAdminError(null);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 15000)
      );

      const dataPromise = getBlogPosts();
      const allPostsData = (await Promise.race([
        dataPromise,
        timeoutPromise,
      ])) as SupabaseBlogPost[];

      const convertedPosts = allPostsData.map(convertSupabaseBlogPost);
      setPosts(convertedPosts);
    } catch (err) {
      console.error("Error loading all blog posts:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load blog posts";
      setAdminError(errorMessage);
      setPosts([]);
    } finally {
      setIsLoadingAdmin(false);
    }
  }, [isAuthenticated]);

  // Initialize published posts on mount (public access)
  useEffect(() => {
    let isMounted = true;

    const initializePublishedPosts = async () => {
      if (isMounted) {
        await loadPublishedPosts();
      }
    };

    initializePublishedPosts();

    return () => {
      isMounted = false;
    };
  }, [loadPublishedPosts]);

  // Load admin posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllPosts();
    } else {
      // Clear admin data when not authenticated
      setPosts([]);
      setIsLoadingAdmin(false);
      setAdminError(null);
    }
  }, [isAuthenticated, loadAllPosts]);

  // PUBLIC METHODS (no auth required)

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const post = await getBlogPostBySlug(slug);
      return post ? convertSupabaseBlogPost(post) : null;
    } catch (err) {
      console.error("Error fetching blog post by slug:", err);
      return null;
    }
  };

  const searchPublishedPosts = async (query: string): Promise<BlogPost[]> => {
    try {
      const searchResults = await searchBlogPosts(query, false); // false = only published
      return searchResults.map(convertSupabaseBlogPost);
    } catch (err) {
      console.error("Error searching published blog posts:", err);
      return [];
    }
  };

  const getPublishedPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    try {
      const tagResults = await getBlogPostsByTag(tag, false); // false = only published
      return tagResults.map(convertSupabaseBlogPost);
    } catch (err) {
      console.error("Error fetching published blog posts by tag:", err);
      return [];
    }
  };

  const getPublishedTags = async (): Promise<string[]> => {
    try {
      return await getBlogTags();
    } catch (err) {
      console.error("Error fetching published blog tags:", err);
      return [];
    }
  };

  const refreshPublishedPosts = async (): Promise<void> => {
    await loadPublishedPosts();
  };

  // ADMIN METHODS (auth required)

  const createPost = async (
    postData: Omit<
      BlogPost,
      "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"
    >
  ): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to create posts");
    }

    try {
      setAdminError(null);

      const slug = postData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-")
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
      setAdminError("Failed to create blog post");
      throw err;
    }
  };

  const updatePost = async (
    id: string,
    updatedData: Partial<BlogPost>
  ): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to update posts");
    }

    try {
      setAdminError(null);

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
      setAdminError("Failed to update blog post");
      throw err;
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to delete posts");
    }

    try {
      setAdminError(null);

      await deleteBlogPostApi(id);

      setPosts((prev) => prev.filter((post) => post.id !== id));
      setPublishedPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setAdminError("Failed to delete blog post");
      throw err;
    }
  };

  const getPost = (id: string): BlogPost | undefined => {
    return posts.find((post) => post.id === id);
  };

  const publishPost = async (id: string): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to publish posts");
    }

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
      setAdminError("Failed to publish blog post");
      throw err;
    }
  };

  const unpublishPost = async (id: string): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to unpublish posts");
    }

    try {
      const unpublishedPost = await unpublishBlogPostApi(id);
      const convertedPost = convertSupabaseBlogPost(unpublishedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? convertedPost : post))
      );

      setPublishedPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error unpublishing blog post:", err);
      setAdminError("Failed to unpublish blog post");
      throw err;
    }
  };

  const searchAllPosts = async (query: string): Promise<BlogPost[]> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to search all posts");
    }

    try {
      const searchResults = await searchBlogPosts(query, true); // true = include unpublished
      return searchResults.map(convertSupabaseBlogPost);
    } catch (err) {
      console.error("Error searching all blog posts:", err);
      return [];
    }
  };

  const refreshAllPosts = async (): Promise<void> => {
    if (!isAuthenticated) {
      throw new Error("Authentication required to refresh all posts");
    }

    await loadAllPosts();
  };

  const value: BlogContextType = {
    // Public data
    publishedPosts,
    isLoadingPublished,
    publicError,

    // Admin data
    posts,
    isLoadingAdmin,
    adminError,

    // Public methods
    getPostBySlug,
    searchPublishedPosts,
    getPublishedPostsByTag,
    getPublishedTags,
    refreshPublishedPosts,

    // Admin methods
    createPost,
    updatePost,
    deletePost,
    getPost,
    publishPost,
    unpublishPost,
    searchAllPosts,
    refreshAllPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

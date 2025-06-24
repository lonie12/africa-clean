/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/blog-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
  slug: string;
}

export interface BlogContextType {
  posts: BlogPost[];
  isLoading: boolean;
  createPost: (
    post: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug">
  ) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  publishPost: (id: string) => Promise<void>;
  unpublishPost: (id: string) => Promise<void>;
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

// Mock blog posts for demonstration
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Les avantages du nettoyage écologique",
    content: "Le nettoyage écologique présente de nombreux avantages...",
    excerpt: "Découvrez pourquoi choisir des produits de nettoyage écologiques",
    imageUrl: "/images/blog/eco-cleaning.jpg",
    status: "published",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    author: "Admin Africa Clean",
    tags: ["écologie", "nettoyage", "santé"],
    slug: "avantages-nettoyage-ecologique",
  },
  {
    id: "2",
    title: "Comment créer un jardin potager bio",
    content: "Guide complet pour créer votre jardin potager biologique...",
    excerpt: "Étapes essentielles pour démarrer votre potager bio",
    imageUrl: "/images/blog/jardin-bio.jpg",
    status: "draft",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    author: "Admin Africa Clean",
    tags: ["jardinage", "bio", "agriculture"],
    slug: "creer-jardin-potager-bio",
  },
];

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    const loadPosts = () => {
      try {
        const stored = localStorage.getItem("blog_posts");
        if (stored) {
          const parsedPosts = JSON.parse(stored).map((post: any) => ({
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt),
          }));
          setPosts(parsedPosts);
        } else {
          setPosts(mockPosts);
          localStorage.setItem("blog_posts", JSON.stringify(mockPosts));
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        setPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("blog_posts", JSON.stringify(posts));
    }
  }, [posts, isLoading]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  const createPost = async (
    postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug">
  ): Promise<void> => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: generateSlug(postData.title),
      };

      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (
    id: string,
    updatedData: Partial<BlogPost>
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                ...updatedData,
                updatedAt: new Date(),
                slug: updatedData.title
                  ? generateSlug(updatedData.title)
                  : post.slug,
              }
            : post
        )
      );
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getPost = (id: string): BlogPost | undefined => {
    return posts.find((post) => post.id === id);
  };

  const publishPost = async (id: string): Promise<void> => {
    await updatePost(id, { status: "published" });
  };

  const unpublishPost = async (id: string): Promise<void> => {
    await updatePost(id, { status: "draft" });
  };

  const value: BlogContextType = {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
    getPost,
    publishPost,
    unpublishPost,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// src/pages/blog/index.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  ArrowLeft,
  MagnifyingGlass,
  Clock,
  SpinnerGap,
  Share,
} from "@phosphor-icons/react";
import { useBlog } from "../../context/blog-context";
import { SearchInput } from "../../components/forms/search-input";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import type { BlogPost } from "../../context/blog-context";

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    publishedPosts,
    isLoadingPublished,
    publicError,
    getPostBySlug,
    searchPublishedPosts,
    getPublishedPostsByTag,
    getPublishedTags,
  } = useBlog();

  // State for blog list view
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState(publishedPosts);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // State for individual post view
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  // Determine if we're showing a single post or the list
  const isShowingSinglePost = !!slug;

  // Load single post when slug is present
  useEffect(() => {
    if (slug) {
      const loadPost = async () => {
        setIsLoadingPost(true);
        setPostError(null);
        try {
          const post = await getPostBySlug(slug);
          if (post) {
            setCurrentPost(post);
          } else {
            setPostError("Article non trouvé");
          }
        } catch (err) {
          console.error("Error loading post:", err);
          setPostError("Erreur lors du chargement de l'article");
        } finally {
          setIsLoadingPost(false);
        }
      };

      loadPost();
    } else {
      setCurrentPost(null);
      setIsLoadingPost(false);
      setPostError(null);
    }
  }, [slug, getPostBySlug]);

  // Load all tags on component mount (for list view)
  useEffect(() => {
    if (!isShowingSinglePost) {
      const loadTags = async () => {
        try {
          const tags = await getPublishedTags();
          setAllTags(tags);
        } catch (err) {
          console.error("Error loading tags:", err);
        }
      };

      loadTags();
    }
  }, [getPublishedTags, isShowingSinglePost]);

  // Update filtered posts when published posts change (for list view)
  useEffect(() => {
    if (!isShowingSinglePost && !searchTerm && !selectedTag) {
      setFilteredPosts(publishedPosts);
    }
  }, [publishedPosts, searchTerm, selectedTag, isShowingSinglePost]);

  // Handle search and filtering (for list view)
  useEffect(() => {
    if (isShowingSinglePost) return;

    const performSearch = async () => {
      if (!searchTerm && !selectedTag) {
        setFilteredPosts(publishedPosts);
        return;
      }

      setIsSearching(true);
      try {
        let results = publishedPosts;

        if (searchTerm) {
          results = await searchPublishedPosts(searchTerm);
        }

        if (selectedTag) {
          if (searchTerm) {
            // Filter search results by tag
            results = results.filter((post) => post.tags.includes(selectedTag));
          } else {
            // Get posts by tag
            results = await getPublishedPostsByTag(selectedTag);
          }
        }

        setFilteredPosts(results);
      } catch (err) {
        console.error("Error performing search:", err);
        setFilteredPosts([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [
    searchTerm,
    selectedTag,
    publishedPosts,
    searchPublishedPosts,
    getPublishedPostsByTag,
    isShowingSinglePost,
  ]);

  // Utility functions
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return `${readingTime} min de lecture`;
  };

  const handleSharePost = async (post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const title = post.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: post.excerpt,
          url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could show a toast here
        alert("Lien copié dans le presse-papier !");
      } catch (err) {
        console.log("Error copying to clipboard:", err);
      }
    }
  };

  // Single Post View
  if (isShowingSinglePost) {
    if (isLoadingPost) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <SpinnerGap
              size={48}
              className="text-[#14A800] animate-spin mx-auto mb-4"
            />
            <p className="text-gray-600">Chargement de l'article...</p>
          </div>
        </div>
      );
    }

    if (postError || !currentPost) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <MagnifyingGlass size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Article non trouvé
            </h2>
            <p className="text-gray-600 mb-6">
              {postError ||
                "L'article que vous recherchez n'existe pas ou a été supprimé."}
            </p>
            <button
              onClick={() => navigate("/blog")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Retour au blog
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center space-x-2 text-[#14A800] hover:text-[#128700] font-medium mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Retour au blog</span>
            </button>

            <div className="mb-6">
              {currentPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#14A800]/10 text-[#14A800] font-medium"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {currentPost.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {currentPost.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{currentPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(currentPost.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{getReadingTime(currentPost.content)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSharePost(currentPost)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-[#14A800] transition-colors"
                >
                  <Share size={16} />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {currentPost.imageUrl && (
            <div className="mb-12">
              <img
                src={currentPost.imageUrl}
                alt={currentPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/800/400";
                }}
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none">
            {currentPost.content.split("\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 leading-relaxed text-gray-700 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Auteur
                </h3>
                <p className="text-gray-600">{currentPost.author}</p>
              </div>

              <button
                onClick={() => handleSharePost(currentPost)}
                className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Share size={16} />
                <span>Partager cet article</span>
              </button>
            </div>
          </footer>
        </main>

        <WhatsAppFloatingButton />
      </div>
    );
  }

  // Blog List View
  // Show loading state
  if (isLoadingPublished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <SpinnerGap
            size={48}
            className="text-[#14A800] animate-spin mx-auto mb-4"
          />
          <p className="text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (publicError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <MagnifyingGlass size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-6">{publicError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14A800] to-[#128700] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog Africa Clean
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Découvrez nos conseils, actualités et expertise en nettoyage
            écologique et services durables
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <SearchInput
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                onClear={clearSearch}
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Filtrer par tag:
              </span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
              >
                <option value="">Tous les tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTag) && (
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-sm text-gray-600">Filtres actifs:</span>
              <div className="flex items-center space-x-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Recherche: "{searchTerm}"
                    <button
                      onClick={clearSearch}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Tag: {selectedTag}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Effacer tous les filtres
                </button>
              </div>
            </div>
          )}

          {/* Search Loading */}
          {isSearching && (
            <div className="mt-4 flex items-center space-x-2 text-gray-600">
              <SpinnerGap size={16} className="animate-spin" />
              <span className="text-sm">Recherche en cours...</span>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {filteredPosts.length === 0 && !isSearching ? (
            <div className="text-center py-12">
              <MagnifyingGlass
                size={48}
                className="text-gray-300 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedTag
                  ? "Essayez de modifier vos critères de recherche."
                  : "Aucun article n'a encore été publié."}
              </p>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Voir tous les articles
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  {filteredPosts.length} article
                  {filteredPosts.length > 1 ? "s" : ""} trouvé
                  {filteredPosts.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/400/300";
                        }}
                      />
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{getReadingTime(post.content)}</span>
                        </div>
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>

                        <div className="inline-flex items-center space-x-2 text-[#14A800] hover:text-[#128700] font-semibold transition-colors">
                          <span>Lire</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Restez informé de nos actualités
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez nos derniers conseils et innovations en matière de
            nettoyage écologique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </button>
            <button
              onClick={() => navigate("/services")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-[#14A800]"
            >
              Découvrir nos services
            </button>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
};

export default BlogPage;

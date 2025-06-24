// src/pages/blog/index.tsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowRight,
  MagnifyingGlass,
  Clock,
  SpinnerGap
} from '@phosphor-icons/react';
import { useBlog } from '../../context/blog-context';
import { SearchInput } from '../../components/forms/search-input';
import WhatsAppFloatingButton from '@/components/common/WhatsAppButton';

const BlogPage: React.FC = () => {
  const { 
    publishedPosts, 
    isLoading, 
    error, 
    searchPosts, 
    getPostsByTag, 
    getAllTags 
  } = useBlog();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState(publishedPosts);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load all tags on component mount
  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (err) {
        console.error('Error loading tags:', err);
      }
    };
    
    loadTags();
  }, [getAllTags]);

  // Update filtered posts when published posts change
  useEffect(() => {
    if (!searchTerm && !selectedTag) {
      setFilteredPosts(publishedPosts);
    }
  }, [publishedPosts, searchTerm, selectedTag]);

  // Handle search and filtering
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm && !selectedTag) {
        setFilteredPosts(publishedPosts);
        return;
      }

      setIsSearching(true);
      try {
        let results = publishedPosts;

        if (searchTerm) {
          results = await searchPosts(searchTerm);
        }

        if (selectedTag) {
          if (searchTerm) {
            // Filter search results by tag
            results = results.filter(post => post.tags.includes(selectedTag));
          } else {
            // Get posts by tag
            results = await getPostsByTag(selectedTag);
          }
        }

        setFilteredPosts(results);
      } catch (err) {
        console.error('Error performing search:', err);
        setFilteredPosts([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTag, publishedPosts, searchPosts, getPostsByTag]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return `${readingTime} min de lecture`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <SpinnerGap size={48} className="text-[#14A800] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <MagnifyingGlass size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-6">{error}</p>
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
            Découvrez nos conseils, actualités et expertise en nettoyage écologique 
            et services durables
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
              <span className="text-sm text-gray-600 whitespace-nowrap">Filtrer par tag:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
              >
                <option value="">Tous les tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
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
                      onClick={() => setSelectedTag('')}
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

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {filteredPosts.length === 0 && !isSearching ? (
            <div className="text-center py-12">
              <MagnifyingGlass size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedTag 
                  ? 'Essayez de modifier vos critères de recherche.'
                  : 'Aucun article n\'a encore été publié.'
                }
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
                  {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Featured Post (First post) */}
              {filteredPosts.length > 0 && (
                <div className="mb-12">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                      {filteredPosts[0].imageUrl && (
                        <div className="md:w-1/2">
                          <img
                            src={filteredPosts[0].imageUrl}
                            alt={filteredPosts[0].title}
                            className="w-full h-64 md:h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/600/400';
                            }}
                          />
                        </div>
                      )}
                      <div className={`${filteredPosts[0].imageUrl ? 'md:w-1/2' : 'w-full'} p-8`}>
                        <div className="mb-4">
                          <span className="inline-block bg-[#14A800] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Article mis en avant
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {filteredPosts[0].title}
                        </h2>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {filteredPosts[0].excerpt}
                        </p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                          <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span>{filteredPosts[0].author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{formatDate(filteredPosts[0].createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{getReadingTime(filteredPosts[0].content)}</span>
                          </div>
                        </div>

                        {filteredPosts[0].tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {filteredPosts[0].tags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                onClick={() => setSelectedTag(tag)}
                              >
                                <Tag size={14} className="mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => window.location.href = `/blog/${filteredPosts[0].slug}`}
                          className="inline-flex items-center space-x-2 bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                          <span>Lire l'article</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Posts Grid */}
              {filteredPosts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(1).map(post => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/api/placeholder/400/300';
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
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                                onClick={() => setSelectedTag(tag)}
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

                        <button
                          onClick={() => window.location.href = `/blog/${post.slug}`}
                          className="inline-flex items-center space-x-2 text-[#14A800] hover:text-[#128700] font-semibold transition-colors"
                        >
                          <span>Lire la suite</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
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
            Découvrez nos derniers conseils et innovations en matière de nettoyage écologique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </button>
            <button
              onClick={() => window.location.href = '/services'}
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
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/admin/index.tsx
import React, { useState } from "react";
import {
  Crown,
  User,
  SignOut,
  House,
  Plus,
  Eye,
  Pencil,
  Trash,
  Globe,
  FileText,
} from "@phosphor-icons/react";
import { useAuth } from "../../context/auth-context";
import { useBlog, type BlogPost } from "../../context/blog-context";
import { useToast } from "../../context/toast-context";
import BlogEditor from "./BlogEditor";

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { posts, deletePost, publishPost, unpublishPost } = useBlog();
  const { success, error } = useToast();
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft"
  >("all");

  const handleLogout = () => {
    logout();
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDelete = async (post: BlogPost) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'article "${post.title}" ?`
      )
    ) {
      try {
        await deletePost(post.id);
        success("Article supprimé", "L'article a été supprimé avec succès.");
      } catch (err) {
        error("Erreur", "Impossible de supprimer l'article.");
      }
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      if (post.status === "published") {
        await unpublishPost(post.id);
        success("Article dépublié", "L'article est maintenant en brouillon.");
      } else {
        await publishPost(post.id);
        success(
          "Article publié",
          "L'article est maintenant visible au public."
        );
      }
    } catch (err) {
      error("Erreur", "Impossible de changer le statut de l'article.");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filterStatus === "all") return true;
    return post.status === filterStatus;
  });

  if (showEditor) {
    return <BlogEditor post={editingPost} onClose={handleCloseEditor} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {/* <div className="h-10 w-10 bg-[#14A800] rounded-lg flex items-center justify-center">
                <Crown size={24} color="white" />
              </div> */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion du Blog
                </h1>
                <p className="text-sm text-gray-500">
                  Africa Clean Administration
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-[#14A800] rounded-full flex items-center justify-center">
                  <User size={16} color="white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Déconnexion"
              >
                <SignOut size={16} />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#14A800] to-[#128700] rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Gestion du Blog 📝</h2>
                <p className="text-lg opacity-90">
                  Créez et gérez les articles du blog Africa Clean
                </p>
                <p className="text-sm opacity-75 mt-2">
                  {posts.length} article{posts.length > 1 ? "s" : ""} •{" "}
                  {posts.filter((p) => p.status === "published").length} publié
                  {posts.filter((p) => p.status === "published").length > 1
                    ? "s"
                    : ""}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                  <FileText size={48} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCreateNew}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Nouvel Article</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filtrer:</span>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "published" | "draft")
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
            >
              <option value="all">Tous les articles</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all"
                  ? "Commencez par créer votre premier article."
                  : `Aucun article ${
                      filterStatus === "published" ? "publié" : "en brouillon"
                    }.`}
              </p>
              {filterStatus === "all" && (
                <button
                  onClick={handleCreateNew}
                  className="bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Créer un article
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status === "published" ? "Publié" : "Brouillon"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Par {post.author}</span>
                        <span>•</span>
                        <span>
                          {post.createdAt.toLocaleDateString("fr-FR")}
                        </span>
                        <span>•</span>
                        <span>
                          {post.tags.length} tag
                          {post.tags.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-6">
                      {post.status === "published" && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir l'article"
                        >
                          <Eye size={16} />
                        </a>
                      )}

                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.status === "published"
                            ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
                            : "text-green-600 hover:text-green-800 hover:bg-green-50"
                        }`}
                        title={
                          post.status === "published" ? "Dépublier" : "Publier"
                        }
                      >
                        <Globe size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(post)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Return to Site */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-[#14A800] hover:text-[#128700] font-medium transition-colors"
          >
            <House size={16} />
            <span>Retour au site principal</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

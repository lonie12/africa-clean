/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/BlogEditor.tsx
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FloppyDisk,
  Eye,
  Globe,
  Image as ImageIcon,
  X,
} from "@phosphor-icons/react";
import { useBlog, type BlogPost } from "../../context/blog-context";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { Textarea } from "@/components/forms/Textarea";
import Button from "@/components/actions/button";
import { CustomSelect } from "@/components/forms/custom-select";
import { Input } from "@/components/forms/Input";
import { TagSelector } from "@/components/forms/tag-selector";
// import Button from '../actions/button';

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
}

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  status: "draft" | "published";
  tags: Array<{ id: string; label: string }>;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onClose }) => {
  const { createPost, updatePost } = useBlog();
  const { user } = useAuth();
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    status: "draft",
    tags: [],
  });

  // Initialize form with post data if editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl || "",
        status: post.status,
        tags: post.tags.map((tag, index) => ({ id: `${index}`, label: tag })),
      });
    }
  }, [post]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (publishNow = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      error("Champs requis", "Le titre et le contenu sont obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt:
          formData.excerpt.trim() || formData.content.substring(0, 150) + "...",
        imageUrl: formData.imageUrl.trim(),
        status: publishNow ? ("published" as const) : formData.status,
        author: user?.name || "Admin",
        tags: formData.tags.map((tag) => tag.label),
      };

      if (post) {
        await updatePost(post.id, postData);
        success(
          "Article mis à jour !",
          publishNow ? "L'article a été publié." : "L'article a été sauvegardé."
        );
      } else {
        await createPost(postData);
        success(
          "Article créé !",
          publishNow
            ? "L'article a été publié."
            : "L'article a été sauvegardé en brouillon."
        );
      }

      onClose();
    } catch (err) {
      error("Erreur", "Impossible de sauvegarder l'article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "draft", label: "Brouillon" },
    { value: "published", label: "Publié" },
  ];

  const isFormValid = formData.title.trim() && formData.content.trim();

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Preview Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Retour à l'édition</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">Aperçu de l'article</div>
            </div>
          </div>
        </header>

        {/* Preview Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/800/300";
                }}
              />
            )}

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {formData.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>Par {user?.name || "Admin"}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString("fr-FR")}</span>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#14A800]/10 text-[#14A800]"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              {formData.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Retour</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">
                {post ? "Modifier l'article" : "Nouvel article"}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!isFormValid}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye size={16} />
                <span>Aperçu</span>
              </button>

              <button
                onClick={() => handleSave(false)}
                disabled={!isFormValid || isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FloppyDisk size={16} />
                <span>Sauvegarder</span>
              </button>

              <button
                onClick={() => handleSave(true)}
                disabled={!isFormValid || isSubmitting}
                className="flex items-center space-x-2 bg-[#14A800] hover:bg-[#128700] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Globe size={16} />
                )}
                <span>{isSubmitting ? "Publication..." : "Publier"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Input
                label="Titre de l'article *"
                placeholder="Entrez le titre de votre article..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-xl font-semibold"
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Textarea
                label="Contenu de l'article *"
                placeholder="Rédigez le contenu de votre article..."
                value={formData.content}
                onChange={(e: { target: { value: any } }) =>
                  handleInputChange("content", e.target.value)
                }
                rows={20}
                className="text-base leading-relaxed"
              />
              <p className="mt-2 text-sm text-gray-500">
                {formData.content.length} caractères
              </p>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Textarea
                label="Extrait (optionnel)"
                placeholder="Résumé de l'article qui apparaîtra dans la liste des articles..."
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                rows={3}
              />
              <p className="mt-2 text-sm text-gray-500">
                {formData.excerpt ? formData.excerpt.length : 0} caractères
                {!formData.excerpt && " (généré automatiquement si vide)"}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Publication
              </h3>

              <div className="space-y-4">
                <CustomSelect
                  label="Statut"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange("status", value)}
                />

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Actions rapides:</p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleSave(false)}
                      disabled={!isFormValid || isSubmitting}
                      className="w-full py-2 px-4 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FloppyDisk size={16} className="mr-2" />
                      Sauvegarder brouillon
                    </Button>

                    <Button
                      onClick={() => handleSave(true)}
                      disabled={!isFormValid || isSubmitting}
                      className="w-full py-2 px-4 bg-[#14A800] hover:bg-[#128700] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Globe size={16} className="mr-2" />
                      )}
                      {isSubmitting ? "Publication..." : "Publier maintenant"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Image mise en avant
              </h3>

              <div className="space-y-4">
                <Input
                  label="URL de l'image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                />

                {formData.imageUrl && (
                  <div className="relative">
                    <img
                      src={formData.imageUrl}
                      alt="Aperçu"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/300/150";
                      }}
                    />
                    <button
                      onClick={() => handleInputChange("imageUrl", "")}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {!formData.imageUrl && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon
                      size={32}
                      className="text-gray-400 mx-auto mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      Ajoutez une URL d'image ci-dessus
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>

              <TagSelector
                selectedTags={formData.tags}
                onTagsChange={(tags: any) => handleInputChange("tags", tags)}
                placeholder="Ajouter des tags..."
              />

              <p className="mt-2 text-sm text-gray-500">
                Les tags aident à organiser et retrouver vos articles.
              </p>
            </div>

            {/* Article Info */}
            {post && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informations
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Créé le:</span>
                    <span className="ml-2 font-medium">
                      {post.createdAt.toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Modifié le:</span>
                    <span className="ml-2 font-medium">
                      {post.updatedAt.toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Auteur:</span>
                    <span className="ml-2 font-medium">{post.author}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Slug:</span>
                    <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {post.slug}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;

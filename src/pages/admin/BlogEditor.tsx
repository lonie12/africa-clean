/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/BlogEditor.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  FloppyDisk,
  Eye,
  Globe,
  X,
  CloudArrowUp,
} from "@phosphor-icons/react";
import { useBlog, type BlogPost } from "../../context/blog-context";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { Textarea } from "@/components/forms/Textarea";
import Button from "@/components/actions/button";
import { CustomSelect } from "@/components/forms/custom-select";
import { Input } from "@/components/forms/Input";
import { TagSelector } from "@/components/forms/tag-selector";
import RichTextEditor from "@/components/forms/RichTextEditor";

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

// Cloudinary upload function with signature generation
const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary configuration is missing. Please check your environment variables."
    );
  }

  // Generate timestamp
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Upload parameters
  const uploadParams = {
    timestamp: timestamp.toString(),
    folder: "africa_clean_blog", // Optional: organize uploads in a folder
    // Add other parameters as needed
  };

  // Generate signature (this is a simplified version - in production, do this on backend)
  const signature = await generateSignature(uploadParams, apiSecret);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", uploadParams.timestamp);
  formData.append("signature", signature);
  formData.append("folder", uploadParams.folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error:", errorData);
      throw new Error(
        errorData.error?.message || "Failed to upload image to Cloudinary"
      );
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};

// Helper function to generate signature (WARNING: This exposes API secret in frontend)
// In production, this should be done on your backend
const generateSignature = async (
  params: Record<string, string>,
  apiSecret: string
): Promise<string> => {
  // Sort parameters
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const stringToSign = sortedParams + apiSecret;

  // Use SubtleCrypto API to generate SHA-1 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

// Convert HTML to plain text for preview and excerpt generation
const htmlToPlainText = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onClose }) => {
  const { createPost, updatePost } = useBlog();
  const { user } = useAuth();
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle rich text content change
  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  // Handle file upload from input or drag & drop
  const handleImageUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      error("Type de fichier invalide", "Veuillez sélectionner une image.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      error(
        "Fichier trop volumineux",
        "La taille maximale autorisée est de 10MB."
      );
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      handleInputChange("imageUrl", uploadedUrl);
      success("Image téléchargée", "L'image a été téléchargée avec succès.");
    } catch (err) {
      console.error("Upload error:", err);
      error(
        "Erreur de téléchargement",
        err instanceof Error
          ? err.message
          : "Impossible de télécharger l'image."
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleSave = async (publishNow = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      error("Champs requis", "Le titre et le contenu sont obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate excerpt from content if not provided
      const plainTextContent = htmlToPlainText(formData.content);
      const autoExcerpt = plainTextContent.substring(0, 150) + "...";

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || autoExcerpt,
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

            {/* Render HTML content directly */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
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

            {/* Rich Text Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <RichTextEditor
                label="Contenu de l'article *"
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Rédigez le contenu de votre article..."
                rows={20}
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>{htmlToPlainText(formData.content).length} caractères</span>
                <span className="text-xs">
                  Raccourcis: Ctrl+B (gras), Ctrl+I (italique), Ctrl+U (souligné), Ctrl+K (lien)
                </span>
              </div>
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
                {!formData.excerpt && " (généré automatiquement à partir du contenu si vide)"}
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

            {/* Enhanced Featured Image Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Image mise en avant
              </h3>

              <div className="space-y-4">
                {/* URL Input */}
                <Input
                  label="URL de l'image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                />

                {/* Separator */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-sm text-gray-500">ou</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-[#14A800] bg-[#14A800]/5"
                      : "border-gray-300 hover:border-gray-400"
                  } ${
                    isUploadingImage
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() =>
                    !isUploadingImage && fileInputRef.current?.click()
                  }
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={isUploadingImage}
                  />

                  {isUploadingImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14A800]"></div>
                      <p className="text-sm text-gray-600">
                        Téléchargement en cours...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <CloudArrowUp size={32} className="text-gray-400" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-[#14A800]">
                          Cliquez pour choisir
                        </span>{" "}
                        ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF jusqu'à 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Preview */}
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
                      disabled={isUploadingImage}
                    >
                      <X size={12} />
                    </button>
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
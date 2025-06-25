// src/components/forms/RichTextEditor.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  Link,
  ListBullets,
  ListNumbers,
  Quotes,
  Code,
  TextH,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  ArrowUUpLeft,
  ArrowUUpRight,
  Image as ImageIcon,
  X,
  CloudArrowUp,
  SpinnerGap,
} from "@phosphor-icons/react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  className?: string;
}

// Cloudinary upload function
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
    folder: "africa_clean_blog_content",
  };

  // Generate signature
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

// Helper function to generate signature
const generateSignature = async (
  params: Record<string, string>,
  apiSecret: string
): Promise<string> => {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const stringToSign = sortedParams + apiSecret;

  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Commencez à écrire...",
  label,
  rows = 15,
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Toolbar configuration
  const toolbarGroups = [
    [
      { command: "undo", icon: <ArrowUUpLeft size={16} />, title: "Annuler" },
      { command: "redo", icon: <ArrowUUpRight size={16} />, title: "Rétablir" },
    ],
    [{ command: "formatBlock", icon: <TextH size={16} />, title: "Titre" }],
    [
      { command: "bold", icon: <TextB size={16} />, title: "Gras" },
      { command: "italic", icon: <TextItalic size={16} />, title: "Italique" },
      {
        command: "underline",
        icon: <TextUnderline size={16} />,
        title: "Souligné",
      },
    ],
    [
      {
        command: "justifyLeft",
        icon: <TextAlignLeft size={16} />,
        title: "Aligner à gauche",
      },
      {
        command: "justifyCenter",
        icon: <TextAlignCenter size={16} />,
        title: "Centrer",
      },
      {
        command: "justifyRight",
        icon: <TextAlignRight size={16} />,
        title: "Aligner à droite",
      },
    ],
    [
      {
        command: "insertUnorderedList",
        icon: <ListBullets size={16} />,
        title: "Liste à puces",
      },
      {
        command: "insertOrderedList",
        icon: <ListNumbers size={16} />,
        title: "Liste numérotée",
      },
    ],
    [
      {
        command: "createLink",
        icon: <Link size={16} />,
        title: "Insérer un lien",
      },
      {
        command: "insertImage",
        icon: <ImageIcon size={16} />,
        title: "Insérer une image",
      },
      { command: "formatBlock", icon: <Quotes size={16} />, title: "Citation" },
      { command: "formatBlock", icon: <Code size={16} />, title: "Code" },
    ],
  ];

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Update editor content when value changes (for editing existing posts)
  useEffect(() => {
    if (
      editorRef.current &&
      isInitialized &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isInitialized]);

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  // Execute formatting command
  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  // Insert image at cursor position
  const insertImageAtCursor = (imageUrl: string, altText: string) => {
    // Focus the editor first
    editorRef.current?.focus();

    // Use execCommand with insertHTML for better compatibility
    const imgHtml = `<img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem; display: block;" />`;

    try {
      // Try using insertHTML command first (modern browsers)
      if (document.queryCommandSupported("insertHTML")) {
        document.execCommand("insertHTML", false, imgHtml);
      } else {
        // Fallback: use innerHTML if cursor position detection fails
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imgElement.alt = altText;
          imgElement.style.cssText =
            "max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem; display: block;";
          range.insertNode(imgElement);
          range.setStartAfter(imgElement);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Last fallback: append to editor content
          if (editorRef.current) {
            editorRef.current.innerHTML += imgHtml;
          }
        }
      }
    } catch (error) {
      console.warn(
        "Failed to insert image at cursor, appending to end:",
        error
      );
      // Final fallback
      if (editorRef.current) {
        editorRef.current.innerHTML += imgHtml;
      }
    }

    // Trigger change event
    handleInput();
  };

  // Handle special commands
  const handleSpecialCommand = (command: string) => {
    switch (command) {
      case "h1":
        executeCommand("formatBlock", "<h1>");
        break;
      case "h2":
        executeCommand("formatBlock", "<h2>");
        break;
      case "h3":
        executeCommand("formatBlock", "<h3>");
        break;
      case "p":
        executeCommand("formatBlock", "<p>");
        break;
      case "blockquote":
        executeCommand("formatBlock", "<blockquote>");
        break;
      case "code":
        executeCommand("formatBlock", "<pre>");
        break;
      case "createLink":
        handleCreateLink();
        break;
      case "insertImage":
        handleInsertImage();
        break;
      default:
        executeCommand(command);
    }
  };

  // Handle link creation
  const handleCreateLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
      setShowLinkInput(true);
    } else {
      const url = prompt("Entrez l'URL du lien:");
      if (url) {
        executeCommand("createLink", url);
      }
    }
  };

  // Handle image insertion
  const handleInsertImage = () => {
    setShowImageInput(true);
    setImageUrl("");
    setImageAlt("");
  };

  // Insert link with URL
  const insertLink = () => {
    if (linkUrl) {
      executeCommand("createLink", linkUrl);
      setShowLinkInput(false);
      setLinkUrl("");
      setSelectedText("");
    }
  };

  // Insert image with URL and alt text
  const insertImage = () => {
    if (imageUrl) {
      insertImageAtCursor(imageUrl, imageAlt || "Image");
      setShowImageInput(false);
      setImageUrl("");
      setImageAlt("");
    }
  };

  // Handle file upload
  const handleImageUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Type de fichier invalide. Veuillez sélectionner une image.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(
        "Fichier trop volumineux. La taille maximale autorisée est de 10MB."
      );
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setImageUrl(uploadedUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Erreur lors du téléchargement de l'image. Veuillez réessayer.");
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

  // Handle drag events for image upload
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

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          executeCommand("bold");
          break;
        case "i":
          e.preventDefault();
          executeCommand("italic");
          break;
        case "u":
          e.preventDefault();
          executeCommand("underline");
          break;
        case "k":
          e.preventDefault();
          handleCreateLink();
          break;
        case "z":
          e.preventDefault();
          executeCommand(e.shiftKey ? "redo" : "undo");
          break;
      }
    }
  };

  // Check if command is active
  const isCommandActive = (command: string): boolean => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  };

  // Handle heading dropdown
  const HeadingDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const headingOptions = [
      { value: "p", label: "Paragraphe normal" },
      { value: "h1", label: "Titre 1" },
      { value: "h2", label: "Titre 2" },
      { value: "h3", label: "Titre 3" },
    ];

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="Format de texte"
        >
          <TextH size={16} />
          <span className="text-xs">▼</span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
            {headingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  handleSpecialCommand(option.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#14A800] focus-within:border-transparent">
        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-gray-50 p-2">
          <div className="flex flex-wrap items-center gap-1">
            {toolbarGroups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {groupIndex > 0 && (
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                )}

                {group.map((button, buttonIndex) => {
                  if (
                    button.command === "formatBlock" &&
                    button.title === "Titre"
                  ) {
                    return <HeadingDropdown key={buttonIndex} />;
                  }

                  if (
                    button.command === "formatBlock" &&
                    button.title === "Citation"
                  ) {
                    return (
                      <button
                        key={buttonIndex}
                        type="button"
                        onClick={() => handleSpecialCommand("blockquote")}
                        className="p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title={button.title}
                      >
                        {button.icon}
                      </button>
                    );
                  }

                  if (
                    button.command === "formatBlock" &&
                    button.title === "Code"
                  ) {
                    return (
                      <button
                        key={buttonIndex}
                        type="button"
                        onClick={() => handleSpecialCommand("code")}
                        className="p-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title={button.title}
                      >
                        {button.icon}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={buttonIndex}
                      type="button"
                      onClick={() => handleSpecialCommand(button.command)}
                      className={`p-2 rounded transition-colors ${
                        isCommandActive(button.command)
                          ? "bg-[#14A800] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      title={button.title}
                    >
                      {button.icon}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="p-4 min-h-[300px] focus:outline-none"
          style={{ minHeight: `${rows * 1.5}rem` }}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>

      {/* Link Input Modal */}
      {showLinkInput && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Insérer un lien</h3>
            <p className="text-sm text-gray-600 mb-4">
              Texte sélectionné: <strong>"{selectedText}"</strong>
            </p>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowLinkInput(false);
                  setLinkUrl("");
                  setSelectedText("");
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-2 bg-[#14A800] hover:bg-[#128700] text-white rounded-lg transition-colors"
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Input Modal */}
      {showImageInput && (
        <div className="fixed backdrop-blur-sm inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Insérer une image</h3>
              <button
                type="button"
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl("");
                  setImageAlt("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                />
              </div>

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
                    <SpinnerGap
                      size={32}
                      className="text-[#14A800] animate-spin"
                    />
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

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte alternatif (optionnel)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Description de l'image..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                />
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={imageAlt || "Aperçu"}
                    className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl("");
                    setImageAlt("");
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  disabled={!imageUrl || isUploadingImage}
                  className="px-4 py-2 bg-[#14A800] hover:bg-[#128700] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insérer l'image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.2;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.3;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #14A800;
          margin: 1rem 0;
          padding: 0.5rem 0 0.5rem 1rem;
          background-color: #f9fafb;
          font-style: italic;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 1rem;
          margin: 1rem 0;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable] a {
          color: #14A800;
          text-decoration: underline;
        }
        
        [contenteditable] a:hover {
          color: #128700;
        }
        
        [contenteditable] strong {
          font-weight: bold;
        }
        
        [contenteditable] em {
          font-style: italic;
        }
        
        [contenteditable] u {
          text-decoration: underline;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

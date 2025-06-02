import React, { useState } from "react";

interface ProductImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface CircularProductDisplayProps {
  centerIcon: React.ReactNode;
  images: ProductImage[];
  title: string;
  description: string;
  centerColor?: string;
  size?: "sm" | "md" | "lg";
}

const CircularProductDisplay: React.FC<CircularProductDisplayProps> = ({
  centerIcon,
  images,
  title,
  description,
  centerColor = "#14A800",
  size = "md",
}) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: {
      containerSize: "w-80 h-80",
      centerSize: "w-20 h-20",
      imageSize: "w-16 h-16",
      radius: 140,
      imageHoverSize: "w-20 h-20",
    },
    md: {
      containerSize: "w-96 h-96",
      centerSize: "w-24 h-24",
      imageSize: "w-18 h-18",
      radius: 160,
      imageHoverSize: "w-24 h-24",
    },
    lg: {
      containerSize: "w-[500px] h-[500px]",
      centerSize: "w-32 h-32",
      imageSize: "w-20 h-20",
      radius: 200,
      imageHoverSize: "w-28 h-28",
    },
  };

  const config = sizeConfig[size];

  // Calculate positions for images in a circle
  const getImagePosition = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * config.radius;
    const y = Math.sin(radian) * config.radius;

    return {
      transform: `translate(${x}px, ${y}px)`,
      "--rotation": `${angle}deg`,
    } as React.CSSProperties;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Title and Description */}
      <div className="text-center max-w-2xl">
        <h3 className="text-2xl md:text-3xl font-bold text-[#212121] mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Circular Animation Container */}
      <div className="relative flex items-center justify-center">
        <div
          className={`relative ${config.containerSize} flex items-center justify-center`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredImage(null);
          }}
        >
          {/* Center Icon */}
          <div
            className={`${config.centerSize} rounded-full flex items-center justify-center shadow-2xl z-20 relative`}
            style={{ backgroundColor: `${centerColor}15` }}
          >
            {/* Pulsing ring effect */}
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: centerColor }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{ backgroundColor: centerColor }}
            />
            <div className="relative z-10 text-white">{centerIcon}</div>
          </div>

          {/* Rotating Images */}
          <div
            className={`absolute inset-0 ${
              isPaused ? "" : "animate-spin-slow"
            }`}
            style={{
              animationDuration: "20s",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={getImagePosition(index, images.length)}
              >
                <div
                  className={`relative transition-all duration-500 cursor-pointer group ${
                    hoveredImage === image.id
                      ? config.imageHoverSize
                      : config.imageSize
                  }`}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  {/* Image container */}
                  <div
                    className={`w-full h-full rounded-full overflow-hidden transition-all duration-500 ${
                      hoveredImage === image.id
                        ? "shadow-2xl ring-4 ring-white ring-opacity-80"
                        : "shadow-lg"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/80/80";
                      }}
                    />
                  </div>

                  {/* Hover tooltip */}
                  {hoveredImage === image.id && image.title && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                      <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                        {image.title}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                      </div>
                    </div>
                  )}

                  {/* Glow effect on hover */}
                  {hoveredImage === image.id && (
                    <div
                      className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                      style={{
                        boxShadow: `0 0 30px ${centerColor}, 0 0 60px ${centerColor}`,
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative rings */}
          <div className="absolute inset-8 border border-gray-200 rounded-full opacity-30" />
          <div className="absolute inset-16 border border-gray-100 rounded-full opacity-20" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          className="px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-white"
          style={{ backgroundColor: centerColor }}
        >
          Voir tous les produits
        </button>
        <button
          className="px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300 transform hover:scale-105"
          style={{
            borderColor: centerColor,
            color: centerColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = centerColor;
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = centerColor;
          }}
        >
          Demander un devis
        </button>
      </div>
    </div>
  );
};

export default CircularProductDisplay;

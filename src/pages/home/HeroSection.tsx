import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: "/images/acceuil/acc1.jpg",
      title: "Pour une Afrique Propre et Durable !",
      subtitle:
        "Solutions professionnelles de nettoyage et services écologiques",
      cta: "Demander un devis gratuit",
    },
    {
      image: "/images/acceuil/acc2.jpg",
      title: "Services de Nettoyage Professionnel",
      subtitle:
        "Bureaux, résidences, centres de santé avec une approche éco-responsable",
      cta: "Découvrir nos services",
    },
    {
      image: "/images/acceuil/acc3.png",
      title: "Création d'Espaces Verts",
      subtitle: "Conception paysagiste 3D, jardins potagers bio et entretien",
      cta: "Voir nos réalisations",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (cta: string) => {
    // Handle different CTA actions based on the button text
    if (cta.includes("devis")) {
      // Navigate to quote page
      window.location.href = "/quote";
    } else if (cta.includes("services")) {
      // Navigate to services page
      window.location.href = "/services";
    } else if (cta.includes("réalisations")) {
      // Navigate to gallery page
      window.location.href = "/galeries";
    }
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/1200/600";
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              <button
                onClick={() => handleCtaClick(slide.cta)}
                className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up animation-delay-400 focus:outline-none focus:ring-4 focus:ring-[#14A800]/50"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
        aria-label="Slide précédent"
      >
        <CaretLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
        aria-label="Slide suivant"
      >
        <CaretRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-[#14A800] transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;

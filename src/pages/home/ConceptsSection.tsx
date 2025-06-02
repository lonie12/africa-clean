import React, { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface Concept {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
  color: string; // Couleur spécifique pour chaque concept
}

const ConceptsSection: React.FC = () => {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);

  const concepts: Concept[] = [
    {
      id: "nettoie-pro",
      title: "Nettoie-Pro",
      description:
        "Solutions de nettoyage professionnel pour bureaux, résidences, industries et centres de santé avec une approche éco-responsable.",
      image: "/images/services/nettoie-pro.jpg",
      category: "Nettoyage",
      href: "/services/nettoie-pro",
      color: "#14A800", // Vert principal
    },
    {
      id: "eco-jardin",
      title: "Eco-Jardin",
      description:
        "Conception paysagiste 3D, aménagement et entretien d'espaces verts durables et esthétiques.",
      image: "/images/services/eco-jardin.jpg",
      category: "Espaces Verts",
      href: "/services/eco-jardin",
      color: "#22C55E", // Vert plus clair
    },
    {
      id: "natura-potager",
      title: "Natura-Potager",
      description:
        "Création et gestion de jardins potagers biologiques pour une alimentation saine et locale.",
      image: "/images/services/natura-potager.jpg",
      category: "Agriculture Bio",
      href: "/services/natura-potager",
      color: "#16A34A", // Vert nature
    },
    {
      id: "nettoie-event",
      title: "Nettoie-Event",
      description:
        "Services complets de nettoyage avant, pendant et après vos événements pour garantir la propreté.",
      image: "/images/services/nettoie-event.jpg",
      category: "Événementiel",
      href: "/services/nettoie-event",
      color: "#0EA5E9", // Bleu
    },
    {
      id: "eco-event",
      title: "Éco-Event",
      description:
        "Gestion écologique des déchets événementiels avec collecte, tri et recyclage pour un impact minimal.",
      image: "/images/services/eco-event.jpg",
      category: "Événementiel",
      href: "/services/eco-event",
      color: "#0284C7", // Bleu plus foncé
    },
    {
      id: "sante-pro",
      title: "Santé-Pro",
      description:
        "Nous garantissons l'hygiène et la propreté dans vos centres de santé.",
      image: "/images/services/sante-pro.png",
      category: "Santé",
      href: "/services/sante-pro",
      color: "#DC2626", // Rouge médical
    },
  ];

  const handleConceptClick = (concept: Concept) => {
    window.location.href = concept.href;
  };

  const handleDevisClick = (conceptId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/quote?concept=${conceptId}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Nos Concepts
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            6 domaines d'expertise pour répondre à tous vos besoins avec des
            solutions durables et innovantes
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="flex flex-col items-center group"
              onMouseEnter={() => setHoveredConcept(concept.id)}
              onMouseLeave={() => setHoveredConcept(null)}
            >
              {/* Circular Image Container */}
              <div className="relative mb-6">
                {/* Animated Border Ring */}
                <div
                  className={`absolute -inset-2 rounded-full transition-all duration-500 ${
                    hoveredConcept === concept.id
                      ? "animate-spin-slow opacity-100"
                      : "opacity-70"
                  }`}
                  style={{
                    background: `conic-gradient(from 0deg, ${concept.color}, transparent, ${concept.color})`,
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gray-50"></div>
                </div>

                {/* Static Colored Border */}
                <div
                  className={`absolute -inset-1 rounded-full transition-all duration-300 ${
                    hoveredConcept === concept.id ? "scale-110" : "scale-100"
                  }`}
                  style={{ backgroundColor: concept.color }}
                ></div>

                {/* Main Image Circle */}
                <div
                  className="relative w-48 h-48 rounded-full overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
                  onClick={() => handleConceptClick(concept)}
                >
                  <img
                    src={concept.image}
                    alt={concept.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/300/300";
                    }}
                  />

                  {/* Overlay with Description */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      hoveredConcept === concept.id
                        ? "bg-black/80 opacity-100"
                        : "bg-black/0 opacity-0"
                    }`}
                  >
                    <div
                      className={`text-center text-white p-4 transform transition-all duration-500 ${
                        hoveredConcept === concept.id
                          ? "scale-100 opacity-100"
                          : "scale-75 opacity-0"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                      style={{ backgroundColor: concept.color }}
                    >
                      {concept.category}
                    </span>
                  </div>

                  {/* Pulsing Dot Indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        hoveredConcept === concept.id ? "animate-pulse" : ""
                      }`}
                      style={{ backgroundColor: concept.color }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Content Below Circle */}
              <div className="text-center max-w-xs">
                <h3
                  className="text-xl font-bold mb-4 transition-colors duration-300 group-hover:text-[#14A800]"
                  style={{
                    color:
                      hoveredConcept === concept.id ? concept.color : "#212121",
                  }}
                >
                  {concept.title}
                </h3>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={(e) => handleDevisClick(concept.id, e)}
                    className="w-full py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-white"
                    style={{
                      backgroundColor: concept.color,
                      boxShadow:
                        hoveredConcept === concept.id
                          ? `0 10px 25px ${concept.color}40`
                          : "none",
                    }}
                  >
                    Demander un Devis
                  </button>

                  <button
                    onClick={() => handleConceptClick(concept)}
                    className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-full border-2 transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: concept.color,
                      color:
                        hoveredConcept === concept.id ? "white" : concept.color,
                      backgroundColor:
                        hoveredConcept === concept.id
                          ? concept.color
                          : "transparent",
                    }}
                  >
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Besoin d'une solution personnalisée ? Nos experts sont à votre
            disposition.
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Contactez nos experts
          </button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#14A800]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#14A800]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-green-400/5 rounded-full blur-3xl" />
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ConceptsSection;

import React, { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface Concept {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
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
    },
    {
      id: "eco-jardin",
      title: "Eco-Jardin",
      description:
        "Conception paysagiste 3D, aménagement et entretien d'espaces verts durables et esthétiques.",
      image: "/images/services/eco-jardin.jpg",
      category: "Espaces Verts",
      href: "/services/eco-jardin",
    },
    {
      id: "natura-potager",
      title: "Natura-Potager",
      description:
        "Création et gestion de jardins potagers biologiques pour une alimentation saine et locale.",
      image: "/images/services/natura-potager.jpg",
      category: "Agriculture Bio",
      href: "/services/natura-potager",
    },
    {
      id: "nettoie-event",
      title: "Nettoie-Event",
      description:
        "Services complets de nettoyage avant, pendant et après vos événements pour garantir la propreté.",
      image: "/images/services/nettoie-event.jpg",
      category: "Événementiel",
      href: "/services/nettoie-event",
    },
    {
      id: "eco-event",
      title: "Éco-Event",
      description:
        "Gestion écologique des déchets événementiels avec collecte, tri et recyclage pour un impact minimal.",
      image: "/images/services/eco-event.jpg",
      category: "Événementiel",
      href: "/services/eco-event",
    },
    {
      id: "sante-pro",
      title: "Santé-Pro",
      description:
        "Nous garantissons l’hygiène et la propreté dans vos centres de santé.",
      image: "/images/services/sante-pro.png",
      category: "sante-pro",
      href: "/services/sante-pro",
    },
  ];

  const handleConceptClick = (concept: Concept) => {
    window.location.href = concept.href;
  };

  const handleDevisClick = (conceptId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to quote page with concept pre-selected
    window.location.href = `/quote?concept=${conceptId}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredConcept(concept.id)}
              onMouseLeave={() => setHoveredConcept(null)}
              onClick={() => handleConceptClick(concept)}
            >
              {/* Card Container */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                {/* Image Container with Circular Animation */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={concept.image}
                    alt={concept.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/400/300";
                    }}
                  />

                  {/* Circular Overlay with Description */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      hoveredConcept === concept.id
                        ? "bg-[#14A800]/95 opacity-100"
                        : "bg-[#14A800]/0 opacity-0"
                    }`}
                  >
                    <div
                      className={`text-center text-white p-6 transform transition-all duration-500 ${
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
                    <span className="bg-[#14A800] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {concept.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#212121] mb-3 group-hover:text-[#14A800] transition-colors duration-300">
                    {concept.title}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => handleDevisClick(concept.id, e)}
                      className="flex-1 bg-[#14A800] hover:bg-[#128700] text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#14A800]/50"
                    >
                      Demander un Devis
                    </button>
                    <button
                      onClick={() => handleConceptClick(concept)}
                      className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-all duration-300 group-hover:bg-[#14A800] group-hover:text-white"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 ${
                    hoveredConcept === concept.id ? "border-[#14A800]" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Besoin d'une solution personnalisée ? Nos experts sont à votre
            disposition.
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Contactez nos experts
          </button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#14A800]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#14A800]/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default ConceptsSection;

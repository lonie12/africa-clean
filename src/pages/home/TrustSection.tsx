import React, { useEffect, useRef } from "react";

interface Client {
  name: string;
  logo: string;
  category: string;
}

interface Partner {
  name: string;
  logo: string;
  description: string;
}

const TrustSection: React.FC = () => {
  const clientsScrollRef = useRef<HTMLDivElement>(null);
  const partnersScrollRef = useRef<HTMLDivElement>(null);

  const clients: Client[] = [
    {
      name: "Pharmacie Solidarité",
      logo: "/images/clients/1.png",
      category: "Pharmacie",
    },
    {
      name: "CMS Notre Dame de la Miséricorde",
      logo: "/images/clients/2.png",
      category: "Centre de santé",
    },
    {
      name: "CHP Bassar",
      logo: "/images/clients/3.png",
      category: "Hôpital",
    },
    {
      name: "Pharmacie Hygéa",
      logo: "/images/clients/4.png",
      category: "Pharmacie",
    },
    {
      name: "Pharmacie Agou",
      logo: "/images/clients/5.png",
      category: "Pharmacie",
    },
    {
      name: "Pharmacie Elkanah",
      logo: "/images/clients/6.png",
      category: "Pharmacie",
    },
    {
      name: "TECORP Architects",
      logo: "/images/clients/7.png",
      category: "BTP & Architecture",
    },
    {
      name: "KEC International",
      logo: "/images/clients/8.png",
      category: "Industrie",
    },
    {
      name: "Résidence Hôtel Mariama",
      logo: "/images/clients/9.png",
      category: "Hôtel",
    },
    {
      name: "EDOLE Africa",
      logo: "/images/clients/10.png",
      category: "Institution",
    },
    {
      name: "Restaurant La Terrazza",
      logo: "/images/clients/11.png",
      category: "Restaurant",
    },
  ];

  const partners: Partner[] = [
    {
      name: "FECECAV",
      logo: "/images/partners/1.png",
      description: "Fédération des employeurs",
    },
    {
      name: "Fondation Magic System",
      logo: "/images/partners/2.png",
      description: "Fondation culturelle",
    },
    {
      name: "Projet R4C Togo",
      logo: "/images/partners/3.png",
      description: "Programme étatique",
    },
    {
      name: "CONFEJES",
      logo: "/images/partners/4.png",
      description: "Organisation internationale",
    },
    {
      name: "PNUD Togo",
      logo: "/images/partners/5.png",
      description: "Programme de développement",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollClients = () => {
      if (clientsScrollRef.current) {
        const container = clientsScrollRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (container.scrollLeft >= scrollWidth - clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
    };

    const scrollPartners = () => {
      if (partnersScrollRef.current) {
        const container = partnersScrollRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (container.scrollLeft >= scrollWidth - clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
    };

    const clientsInterval = setInterval(scrollClients, 30);
    const partnersInterval = setInterval(scrollPartners, 40); // Slightly different speed

    return () => {
      clearInterval(clientsInterval);
      clearInterval(partnersInterval);
    };
  }, []);

  const pauseScroll = () => {
    // You can implement pause functionality here if needed
  };

  const resumeScroll = () => {
    // You can implement resume functionality here if needed
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Ils Nous Font Confiance
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Plus de 500 clients satisfaits nous font confiance pour leurs
            besoins en nettoyage et services écologiques
          </p>
        </div>

        {/* Clients Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-[#14A800] rounded"></div>
              <h3 className="text-2xl font-bold text-[#212121]">Nos Clients</h3>
              <div className="w-12 h-1 bg-[#14A800] rounded"></div>
            </div>
          </div>

          {/* Scrolling Container for Clients */}
          <div className="relative overflow-hidden">
            <div
              ref={clientsScrollRef}
              className="flex space-x-8 overflow-x-hidden"
              onMouseEnter={() => pauseScroll()}
              onMouseLeave={() => resumeScroll()}
              style={{ width: "max-content" }}
            >
              {/* Duplicate array for seamless scrolling */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  style={{ minWidth: "200px", width: "200px" }}
                >
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/120/60";
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                      {client.name}
                    </h4>
                    <span className="text-xs text-[#14A800] bg-[#14A800]/10 px-2 py-1 rounded-full">
                      {client.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-[#14A800] rounded"></div>
              <h3 className="text-2xl font-bold text-[#212121]">
                Nos Partenaires
              </h3>
              <div className="w-12 h-1 bg-[#14A800] rounded"></div>
            </div>
          </div>

          {/* Scrolling Container for Partners */}
          <div className="relative overflow-hidden">
            <div
              ref={partnersScrollRef}
              className="flex space-x-8 overflow-x-hidden"
              onMouseEnter={() => pauseScroll()}
              onMouseLeave={() => resumeScroll()}
              style={{ width: "max-content" }}
            >
              {/* Duplicate array for seamless scrolling */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  style={{ minWidth: "220px", width: "220px" }}
                >
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/120/60";
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-[#14A800] rounded-2xl p-8 text-center text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Partenaires de Confiance</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">6+</div>
              <div className="text-lg opacity-90">Années d'Expérience</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Rejoignez nos clients satisfaits et découvrez pourquoi ils nous font
            confiance
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Devenir client
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;

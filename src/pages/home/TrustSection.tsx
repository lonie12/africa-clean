import React from "react";

interface Client {
  name: string;
  logo: string;
}

interface Partner {
  name: string;
  logo: string;
}

const TrustSection: React.FC = () => {
  const clients: Client[] = [
    { name: "Pharmacie Solidarité", logo: "/images/clients/1.png" },
    { name: "CMS Notre Dame de la Miséricorde", logo: "/images/clients/2.png" },
    { name: "CHP Bassar", logo: "/images/clients/3.png" },
    { name: "Pharmacie Hygéa", logo: "/images/clients/4.png" },
    { name: "Pharmacie Agou", logo: "/images/clients/5.png" },
    { name: "Pharmacie Elkanah", logo: "/images/clients/6.png" },
    { name: "TECORP Architects", logo: "/images/clients/7.png" },
    { name: "KEC International", logo: "/images/clients/8.png" },
    { name: "Résidence Hôtel Mariama", logo: "/images/clients/9.png" },
    { name: "EDOLE Africa", logo: "/images/clients/10.png" },
    { name: "Restaurant La Terrazza", logo: "/images/clients/11.png" },
  ];

  const partners: Partner[] = [
    { name: "FECECAV", logo: "/images/partners/1.png" },
    { name: "Fondation Magic System", logo: "/images/partners/2.png" },
    { name: "Projet R4C Togo", logo: "/images/partners/3.png" },
    { name: "CONFEJES", logo: "/images/partners/4.png" },
    { name: "PNUD Togo", logo: "/images/partners/5.png" },
  ];

  return (
    <>
      <section className="py-16 bg-gray-50">
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
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-[#14A800] rounded"></div>
                <h3 className="text-2xl font-bold text-[#212121]">
                  Nos Clients
                </h3>
                <div className="w-12 h-1 bg-[#14A800] rounded"></div>
              </div>
            </div>

            {/* Scrolling Container for Clients */}
            <div className="relative overflow-hidden bg-white rounded-xl shadow-sm py-8">
              <div className="flex animate-scroll-right">
                {/* Double the array for seamless infinite scrolling */}
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center h-16 px-6 mx-4 group"
                    style={{ minWidth: "220px" }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/120/48";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mb-12">
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
            <div className="relative overflow-hidden bg-white rounded-xl shadow-sm py-8">
              <div className="flex animate-scroll-left">
                {/* Double the array for seamless infinite scrolling */}
                {[...partners, ...partners, ...partners].map(
                  (partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center h-16 px-8 mx-6 group"
                      style={{ minWidth: "220px" }}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/140/48";
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-r from-[#14A800] to-[#128700] rounded-2xl p-8 text-center text-white shadow-xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Clients Satisfaits</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">
                  Partenaires de Confiance
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2">6+</div>
                <div className="text-lg opacity-90">Années d'Expérience</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">
              Rejoignez nos clients satisfaits et découvrez pourquoi ils nous
              font confiance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Devenir client
              </button>
              <button
                onClick={() => (window.location.href = "/quote")}
                className="border-2 border-[#14A800] text-[#14A800] hover:bg-[#14A800] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Demander un devis gratuit
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#14A800]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#14A800]/5 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 15s linear infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default TrustSection;

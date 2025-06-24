import React from "react";
import { Link } from "react-router";
import { 
  House, 
  ArrowLeft, 
  MagnifyingGlass,
  Sparkle,
  Leaf,
  Recycle,
  Phone,
//   EnvelopeSimple
} from "@phosphor-icons/react";

const NotFound: React.FC = () => {
  const suggestions = [
    { label: "Accueil", href: "/", icon: <House size={20} /> },
    { label: "Nos Services", href: "/services", icon: <Sparkle size={20} /> },
    { label: "Nos Produits", href: "/produits", icon: <Leaf size={20} /> },
    { label: "Demander un Devis", href: "/quote", icon: <Recycle size={20} /> },
    { label: "Contact", href: "/contact", icon: <Phone size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#14A800]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* 404 Illustration */}
        <div className="relative mb-12">
          {/* Large 404 number */}
          <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gray-200 select-none leading-none">
            404
          </div>
          
          {/* Animated search icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-6 md:p-8 shadow-2xl animate-bounce border-4 border-[#14A800]/20">
              <MagnifyingGlass size={48} className="text-[#14A800]" />
            </div>
          </div>

          {/* Floating decorative icons */}
          <div className="absolute -top-4 -left-4 opacity-30 animate-float">
            <Leaf size={32} className="text-[#14A800]" />
          </div>
          <div className="absolute -top-2 -right-6 opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
            <Recycle size={28} className="text-blue-500" />
          </div>
          <div className="absolute -bottom-4 left-1/4 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
            <Sparkle size={24} className="text-green-400" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] leading-tight">
            Oops ! Page Introuvable
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            La page que vous cherchez semble avoir disparu. Pas de panique ! 
            Explorons ensemble nos solutions écologiques pour vous remettre sur la bonne voie.
          </p>
          
          {/* Africa Clean branding message */}
          {/* <div className="bg-gradient-to-r from-[#14A800] to-[#128700] rounded-2xl p-6 text-white mx-auto max-w-md">
            <h3 className="font-bold text-lg mb-2">Pour une Afrique Propre et Durable !</h3>
            <p className="text-sm opacity-90">Continuons votre journey vers des solutions écologiques</p>
          </div> */}
        </div>

        {/* Quick Navigation */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-[#212121] mb-6">Où souhaitez-vous aller ?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                to={suggestion.href}
                className="bg-white hover:bg-[#14A800] text-gray-700 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-[#14A800] flex flex-col items-center space-y-2"
              >
                <div className="text-[#14A800] group-hover:text-white transition-colors">
                  {suggestion.icon}
                </div>
                <span className="text-sm">{suggestion.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <House size={20} />
            <span>Retour à l'Accueil</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-3 border-2 border-[#14A800] text-[#14A800] hover:bg-[#14A800] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Page Précédente</span>
          </button>
        </div>

        {/* Help Section */}
        {/* <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#212121] mb-4">Besoin d'aide ?</h3>
          <p className="text-gray-600 mb-6">
            Notre équipe est là pour vous accompagner dans vos besoins en nettoyage et services écologiques.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+22890453153"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <Phone size={18} />
              <span>+228 90 45 31 53</span>
            </a>
            
            <a
              href="mailto:africaclean.contact@gmail.com"
              className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <EnvelopeSimple size={18} />
              <span>Nous écrire</span>
            </a>
          </div>
        </div> */}
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Bounce animation for search icon */
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -15px, 0);
          }
          70% {
            transform: translate3d(0, -8px, 0);
          }
          90% {
            transform: translate3d(0, -3px, 0);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Pulse animation for background elements */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Ensure icons inherit color properly */
        .group:hover .text-[#14A800] {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
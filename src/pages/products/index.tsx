import React from "react";
import { Recycle, Leaf, ShoppingCart, Sparkle } from "@phosphor-icons/react";
import CircularProductDisplay from "@/components/features/products/CircularProductDisplay";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import { Award } from "iconsax-react";

const ProductsPage: React.FC = () => {
  // Images pour les poubelles EcoTrash
  const ecoTrashImages = [
    {
      id: "ecotrash-1",
      src: "/images/products/ecotrash/1.jpg",
      alt: "Poubelle EcoTrash modèle 1",
      title: "EcoTrash Classic",
    },
    {
      id: "ecotrash-2",
      src: "/images/products/ecotrash/2.jpg",
      alt: "Poubelle EcoTrash modèle 2",
      title: "EcoTrash Pro",
    },
    {
      id: "ecotrash-3",
      src: "/images/products/ecotrash/3.jpg",
      alt: "Poubelle EcoTrash modèle 3",
      title: "EcoTrash Smart",
    },
    {
      id: "ecotrash-4",
      src: "/images/products/ecotrash/4.jpg",
      alt: "Poubelle EcoTrash modèle 4",
      title: "EcoTrash Event",
    },
    {
      id: "ecotrash-5",
      src: "/images/products/ecotrash/12.jpg",
      alt: "Poubelle EcoTrash modèle 5",
      title: "EcoTrash Mini",
    },
    {
      id: "ecotrash-6",
      src: "/images/products/ecotrash/6.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
    {
      id: "ecotrash-7",
      src: "/images/products/ecotrash/7.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
    {
      id: "ecotrash-8",
      src: "/images/products/ecotrash/8.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
    {
      id: "ecotrash-9",
      src: "/images/products/ecotrash/9.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
    {
      id: "ecotrash-10",
      src: "/images/products/ecotrash/10.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
    {
      id: "ecotrash-11",
      src: "/images/products/ecotrash/11.jpg",
      alt: "Poubelle EcoTrash modèle 6",
      title: "EcoTrash XL",
    },
  ];

  // Images pour les produits d'entretien
  const cleaningProductImages = [
    {
      id: "cleaning-1",
      src: "/images/products/ecoclean/1.jpg",
      alt: "Détergent écologique",
      title: "Détergent Multi-surfaces",
    },
    {
      id: "cleaning-2",
      src: "/images/products/ecoclean/2.jpg",
      alt: "Nettoyant vitres écologique",
      title: "Nettoyant Vitres Bio",
    },
    {
      id: "cleaning-3",
      src: "/images/products/ecoclean/3.jpg",
      alt: "Désinfectant écologique",
      title: "Désinfectant Naturel",
    },
    {
      id: "cleaning-4",
      src: "/images/products/ecoclean/4.jpg",
      alt: "Détartrant écologique",
      title: "Détartrant Bio",
    },
    {
      id: "cleaning-5",
      src: "/images/products/ecoclean/5.jpg",
      alt: "Savon écologique",
      title: "Savon Écologique",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#14A800] to-[#128700] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Produits Écologiques
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Des solutions innovantes et durables pour un environnement plus
            propre
          </p>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="font-semibold">Qualité Premium</h3>
              <p className="text-sm opacity-80">Produits certifiés et testés</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Leaf size={32} className="text-white" />
              </div>
              <h3 className="font-semibold">100% Écologique</h3>
              <p className="text-sm opacity-80">
                Respectueux de l'environnement
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Sparkle size={32} className="text-white" />
              </div>
              <h3 className="font-semibold">Innovation</h3>
              <p className="text-sm opacity-80">Technologies avancées</p>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Poubelles EcoTrash Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <CircularProductDisplay
            centerIcon={<Recycle size={48} />}
            images={ecoTrashImages}
            title="Poubelles ECOTRASH"
            description="Les poubelles EcoTrash se distinguent par leur design pratique, durable et respectueux de l'environnement. Conçues pour le tri sélectif, elles facilitent le recyclage lors des événements, dans les entreprises ou à la maison. Fabriquées à partir de matériaux recyclés et recyclables, elles contribuent activement à une démarche zéro déchet."
            centerColor="#14A800"
            size="lg"
          />
        </div>
      </section>

      {/* Separator */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-1 bg-[#14A800] rounded" />
              <ShoppingCart size={24} className="text-[#14A800]" />
              <div className="w-8 h-1 bg-[#14A800] rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Produits d'Entretien Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <CircularProductDisplay
            centerIcon={<Leaf size={48} />}
            images={cleaningProductImages}
            title="Produits d'Entretien Écologiques"
            description="Nos produits d'entretien écologiques sont formulés à base d'ingrédients naturels, biodégradables et sans substances nocives. Parfaits pour un usage régulier, ils assurent une efficacité optimale tout en préservant votre santé et la planète. Que ce soit pour des événements, des espaces publics ou des foyers, nos solutions garantissent propreté, hygiène et impact réduit sur l'environnement."
            centerColor="#22C55E"
            size="lg"
          />
        </div>
      </section>

      {/* Why Choose Our Products Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Pourquoi Choisir Nos Produits ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf size={32} className="text-[#14A800]" />,
                title: "Écologique",
                description: "Produits respectueux de l'environnement",
              },
              {
                icon: (
                  <Award color="#14A800" size={32} className="text-[#14A800]" />
                ),
                title: "Certifié",
                description: "Qualité garantie et certifications officielles",
              },
              {
                icon: <Recycle size={32} className="text-[#14A800]" />,
                title: "Recyclable",
                description: "Conçus dans une démarche d'économie circulaire",
              },
              {
                icon: <Sparkle size={32} className="text-[#14A800]" />,
                title: "Efficace",
                description: "Performance optimale pour tous vos besoins",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#212121] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Passer à l'Écologique ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour découvrir nos produits et obtenir un devis
            personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Nous Contacter
            </button>
            <button
              onClick={() => (window.location.href = "/quote")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-[#14A800]"
            >
              Demander un Devis
            </button>
          </div>
        </div>

        <style>
          {`
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            .animate-spin-slow {
              animation: spin-slow 20s linear infinite;
            }
        `}
        </style>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
};

export default ProductsPage;

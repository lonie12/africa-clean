import React from "react";
import { Recycle, Leaf, ShoppingCart, Sparkle } from "@phosphor-icons/react";
import CircularProductDisplay from "@/components/features/products/CircularProductDisplay";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import { Award } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface FeaturesType {
  icon: string;
  title: string;
  description: string;
}
const IconMap: Record<string, React.ElementType> = {
  Award,
  Leaf,
  Sparkle,
  Recycle
};
const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  // Images pour les poubelles EcoTrash (simplifiées)
  const ecoTrashImages = [
    { id: "ecotrash-1", src: "/images/products/ecotrash/1.jpg" },
    { id: "ecotrash-2", src: "/images/products/ecotrash/2.jpg" },
    { id: "ecotrash-3", src: "/images/products/ecotrash/3.jpg" },
    { id: "ecotrash-4", src: "/images/products/ecotrash/4.jpg" },
    { id: "ecotrash-5", src: "/images/products/ecotrash/12.jpg" },
    { id: "ecotrash-6", src: "/images/products/ecotrash/6.jpg" },
    { id: "ecotrash-7", src: "/images/products/ecotrash/7.jpg" },
    { id: "ecotrash-8", src: "/images/products/ecotrash/8.jpg" },
    { id: "ecotrash-9", src: "/images/products/ecotrash/9.jpg" },
    { id: "ecotrash-10", src: "/images/products/ecotrash/10.jpg" },
    { id: "ecotrash-11", src: "/images/products/ecotrash/11.jpg" },
  ];

  // Images pour les produits d'entretien (simplifiées)
  const cleaningProductImages = [
    { id: "cleaning-1", src: "/images/products/ecoclean/1.jpg" },
    { id: "cleaning-2", src: "/images/products/ecoclean/2.jpg" },
    { id: "cleaning-3", src: "/images/products/ecoclean/3.jpg" },
    { id: "cleaning-4", src: "/images/products/ecoclean/4.jpg" },
    { id: "cleaning-5", src: "/images/products/ecoclean/5.jpg" },
  ];
  const features = t("productPage.features", {
    returnObjects: true,
  }) as FeaturesType[];
  const items = t("productPage.items", {
    returnObjects: true,
  }) as FeaturesType[];
  const whyChooseStats = t("productPage.whyChoose.whyChooseStats", {
    returnObjects: true,
  }) as FeaturesType[]; 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#14A800] to-[#128700] text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/pages/PAGE_PRODUIT.png"
            alt="Produits Africa Clean"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14A800]/70 to-[#128700]/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("productPage.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            {t("productPage.description")}
          </p>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((item, idx) => {
              const Icon = IconMap[item.icon];
              return (
                <div key={idx} className="flex flex-col items-center space-y-3">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Icon color="white" size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Poubelles EcoTrash Section - Alignée à gauche avec effet immersif */}
      <section id="ecotrash" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container positionné pour créer l'effet immersif à gauche */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Texte à gauche sur desktop, en haut sur mobile */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#212121] mb-4">
                {items[0].title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {items[0].description}
              </p>
            </div>

            {/* Animation circulaire */}
            <div className="flex-shrink-0">
              <CircularProductDisplay
                centerIcon={<Recycle size={60} />}
                images={ecoTrashImages}
                title=""
                description=""
                centerColor="#14A800"
                size="lg"
              />
            </div>
          </div>
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

      {/* Produits d'Entretien Section - Alignée à droite avec effet immersif */}
      <section id="ecoclean" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container positionné pour créer l'effet immersif à droite */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
            {/* Animation circulaire */}
            <div className="flex-shrink-0">
              <CircularProductDisplay
                centerIcon={<Leaf size={60} />}
                images={cleaningProductImages}
                title=""
                description=""
                centerColor="#22C55E"
                size="lg"
              />
            </div>

            {/* Texte à droite sur desktop, en bas sur mobile */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#212121] mb-4">
                {items[1].title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {items[1].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Products Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            {t('productPage.whyChoose.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseStats.map((feature, index) => {
              const Icon = IconMap[feature.icon];
              return(
              <div key={index} className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <Icon color="#128700" size={32}  />
                </div>
                <h3 className="text-xl font-semibold text-[#212121] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('productPage.cTASection.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('productPage.cTASection.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
            {t('cover.contactUs')}

            </button>
            <button
              onClick={() => (window.location.href = "/quote")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-[#14A800]"
            >
            {t('cover.quote')}
            </button>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />

      {/* Styles CSS pour les animations */}
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
            animation: spin-slow 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ProductsPage;

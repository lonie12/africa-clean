import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Sparkle,
  Leaf,
  Phone,
  Clock,
  Star,
} from "@phosphor-icons/react";
import { Building, GraduationCap } from "@phosphor-icons/react";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import { useTranslation } from "react-i18next";

interface ConceptDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  services: string[];
  benefits: string[];
  images: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}
interface FormationsType {
  title: string;
  duration: string;
}
const ServicesPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll spy effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;
        const id = element.getAttribute("data-section");

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { t } = useTranslation();
  const translationConcepts = t("servicePage.concepts", {
    returnObjects: true,
  }) as ConceptDetail[];

  const concepts: ConceptDetail[] = [
    {
      id: "nettoie-pro",
      title: translationConcepts[0].title,
      subtitle: translationConcepts[0].subtitle,
      description: translationConcepts[0].description,
      icon: (
        <img
          src="/images/services/nettoiepro-logo.png"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#14A800",
      // color: "#14A800",
      gradient: "from-green-500 to-green-600",
      services: translationConcepts[0].services,
      benefits: translationConcepts[0].benefits,
      images: [
        "/images/services/nettoie-pro-1.jpg",
        "/images/services/nettoie-pro-2.jpg",
        "/images/services/nettoie-pro-3.jpg",
      ],
      stats: translationConcepts[0].stats,
    },
    {
      id: "sante-pro",
      title: translationConcepts[1].title,
      subtitle: translationConcepts[1].subtitle,
      description: translationConcepts[1].description,
      icon: (
        <img
          src="/images/services/santepro-logo.png"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#DC2626",
      gradient: "from-red-500 to-red-600",
      services: translationConcepts[1].services,
      benefits: translationConcepts[1].benefits,
      images: [
        "/images/services/sante-pro-1.jpg",
        "/images/services/sante-pro-2.jpg",
        "/images/services/sante-pro-3.jpg",
      ],
      stats: translationConcepts[0].stats,
    },
    {
      id: "eco-jardin",
      title: translationConcepts[2].title,
      subtitle: translationConcepts[2].subtitle,
      description: translationConcepts[2].description,
      icon: (
        <img
          src="/images/services/ecojardin-logo.png"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#22C55E",
      gradient: "from-green-400 to-green-500",
      services: translationConcepts[2].services,
      benefits: translationConcepts[2].benefits,
      images: [
        "/images/services/eco-jardin-1.jpg",
        "/images/services/eco-jardin-2.jpg",
        "/images/services/eco-jardin-3.jpg",
      ],
      stats: translationConcepts[2].stats,
    },
    {
      id: "natura-potager",
      title: translationConcepts[3].title,
      subtitle: translationConcepts[3].subtitle,
      description: translationConcepts[3].description,
      icon: (
        <img
          src="/images/services/naturapotager-logo.jpg"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#16A34A",
      gradient: "from-green-600 to-green-700",
      services: translationConcepts[3].services,
      benefits: translationConcepts[3].benefits,
      images: [
        "/images/services/natura-potager-4.jpg",
        "/images/services/natura-potager-1.png",
        "/images/services/natura-potager-3.jpg",
      ],
      stats: translationConcepts[3].stats,
    },
    {
      id: "eco-event",
      title: translationConcepts[4].title,
      subtitle: translationConcepts[4].subtitle,
      description: translationConcepts[4].description,
      icon: (
        <img
          src="/images/services/ecoevent-logo.jpg"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#0284C7",
      gradient: "from-blue-500 to-blue-600",
      services: translationConcepts[4].services,
      benefits: translationConcepts[4].benefits,
      images: [
        "/images/services/eco-event-1.jpg",
        "/images/services/eco-event-2.jpg",
        "/images/services/eco-event-3.jpg",
      ],
      stats: translationConcepts[4].stats,
    },
    {
      id: "nettoie-event",
      title: translationConcepts[5].title,
      subtitle: translationConcepts[5].subtitle,
      description: translationConcepts[5].description,
      icon: (
        <img
          src="/images/services/nettoieevent-logo.jpg"
          className="w-full h-full object-cover object-center scale-150"
        />
      ),
      color: "#0EA5E9",
      gradient: "from-sky-500 to-sky-600",
      services: translationConcepts[5].services,
      benefits: translationConcepts[5].benefits,
      images: [
        "/images/services/nettoie-event-1.jpg",
        "/images/services/nettoie-event-2.jpg",
        "/images/services/nettoie-event-3.png",
      ],
      stats: translationConcepts[5].stats,
    },
  ];

  const formationsItemes = t("servicePage.formation.items", {
    returnObjects: true,
  }) as FormationsType[];
  const formations = [
    {
      title: formationsItemes[0].title,
      duration: formationsItemes[2].duration,
      image: "/images/formations/nettoyage.jpg",
    },
    {
      title: formationsItemes[1].title,
      duration: formationsItemes[1].duration,
      image: "/images/formations/hospitalier.jpg",
    },
    {
      title: formationsItemes[2].title,
      duration: formationsItemes[2].duration,
      image: "/images/formations/jardinier.jpg",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#14A800] to-[#128700] text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/pages/PAGE_SERVICE.jpg"
            alt="Services Africa Clean"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14A800]/55 to-[#128700]/45"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("servicePage.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t("servicePage.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("concepts")}
              className="bg-white text-[#14A800] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {t("cover.ourNotion")}
            </button>
            <button
              onClick={() => scrollToSection("formations")}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
            >
              {t("cover.ourFormation")}
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-bounce">
          <Sparkle size={40} />
        </div>
        <div
          className="absolute bottom-20 right-10 opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Leaf size={35} />
        </div>
      </section>

      {/* Navigation Sticky */}
      <nav className="sticky top-0 bg-white shadow-md z-40 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {concepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => scrollToSection(concept.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === concept.id
                    ? "text-white shadow-lg"
                    : "text-gray-700 hover:text-white hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    activeSection === concept.id
                      ? concept.color
                      : "transparent",
                  borderColor: concept.color,
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                {concept.title}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("formations")}
              className={`whitespace-nowrap px-4 py-2 rounded-full border-2 border-purple-600 transition-all duration-300 ${
                activeSection === "formations"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            >
              Formations
            </button>
          </div>
        </div>
      </nav>

      {/* Concepts Section */}
      <section id="concepts" data-section="concepts" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Nos 6 Concepts
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Des solutions complètes et spécialisées pour chaque domaine
              d'activité
            </p>
          </div>

          {/* Concept Details */}
          {concepts.map((concept, index) => (
            <div
              key={index}
              // key={concept.id}
              // id={concept.id}
              // data-section={concept.id}
              className="mb-24 scroll-mt-32"
            >
              <div
                className={`bg-white rounded-3xl shadow-xl overflow-hidden ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex flex-col lg:flex`}
              >
                {/* Content Side */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <div
                      className="p-4 rounded-full mr-4 shrink-0 border border-gray-300 size-24 overflow-hidden"
                      // style={{ backgroundColor: concept.color, color: "white" }}
                    >
                      {concept.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#212121]">
                        {concept.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{concept.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {concept.description}
                  </p>

                  {/* Services List */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <Building
                        size={20}
                        className="mr-2"
                        style={{ color: concept.color }}
                      />
                      {t("cover.ourServices")}
                    </h4>
                    <div className="grid gap-3">
                      {concept.services.map((service, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle
                            size={20}
                            className="mr-3 mt-1 flex-shrink-0"
                            style={{ color: concept.color }}
                          />
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <Star
                        size={20}
                        className="mr-2"
                        style={{ color: concept.color }}
                      />
                      {t("cover.whyChoose")}
                    </h4>
                    <div className="grid gap-2">
                      {concept.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-3"
                            style={{ backgroundColor: concept.color }}
                          ></div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  {concept.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {concept.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div
                            className="text-2xl font-bold"
                            style={{ color: concept.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() =>
                      (window.location.href = `/quote?concept=${concept.id}`)
                    }
                    className="w-full py-4 px-8 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                    style={{ backgroundColor: concept.color }}
                  >
                    <span>{t("cover.freeQuote")}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {concept.images.map((image, idx) => (
                      <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ${
                          idx === 0 ? "col-span-2" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${concept.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/400/300";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formations Section */}
      <section
        id="formations"
        data-section="formations"
        className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50 scroll-mt-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <GraduationCap size={40} className="text-purple-600 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#212121]">
                {t("cover.ourFormation")}
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              {t("servicePage.formation.description")}
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#212121] mb-6">
                {t("servicePage.formation.subtitle")}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {formations.map((formation, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 mb-4 text-white">
                      <GraduationCap size={40} className="mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-2">
                        {formation.title}
                      </h4>
                      <div className="flex items-center justify-center text-purple-200">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm">{formation.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Formation Images Grid */}
          {/* no images grid for now */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={`/images/formations/formation-${num}.jpg`}
                  alt={`Formation ${num}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/300/300";
                  }}
                />
              </div>
            ))}
          </div> */}
          {/* Contact for Formation */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t("servicePage.formation.footer.title")}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t("servicePage.formation.footer.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+22890453153"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                +228 90 45 31 53
              </a>
              <a
                href="mailto:africaclean.contact@gmail.com"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                {t("cover.contactUs")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("servicePage.formation.cTAService.title")}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t("servicePage.formation.cTAService.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/quote")}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {t("cover.giveFreeQuote")}
            </button>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
            >
              {t("cover.contactUs")}
            </button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default ServicesPage;

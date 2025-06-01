import { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  WhatsappLogo,
  Star,
  CheckCircle,
  Leaf,
  Recycle,
  Users,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { Award } from "iconsax-react";
import type { ReactNode } from "react";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
// Hero Section avec diaporama
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {slide.subtitle}
              </p>
              <button className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <CaretLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <CaretRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Section résumé
const AboutSummary = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
              AFRICA CLEAN
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Depuis 2018, AFRICA CLEAN (anciennement GROUPE LUMIERE JEUNESSE)
              est votre partenaire de confiance pour des solutions de nettoyage
              professionnel et des services écologiques au Togo et en Afrique de
              l'Ouest.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Dirigée par M. AGBEKO Koffi Lucien, notre entreprise met la
              technologie et l'innovation au service de l'hygiène et de
              l'environnement, avec un objectif clair : vous offrir des
              solutions efficaces, durables et personnalisées.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#14A800]">6+</div>
                <div className="text-gray-600">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#14A800]">500+</div>
                <div className="text-gray-600">Clients satisfaits</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/api/placeholder/250/200"
              alt="Équipe AFRICA CLEAN"
              className="rounded-lg shadow-lg"
            />
            <img
              src="/api/placeholder/250/200"
              alt="Services professionnels"
              className="rounded-lg shadow-lg mt-8"
            />
            <img
              src="/api/placeholder/250/200"
              alt="Réalisations"
              className="rounded-lg shadow-lg -mt-4"
            />
            <img
              src="/api/placeholder/250/200"
              alt="Produits écologiques"
              className="rounded-lg shadow-lg mt-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Produits + Services
const ProductsServicesOverview = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Nos Produits & Services
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Chez Africa Clean, nous proposons des solutions professionnelles et
            écologiques adaptées à vos besoins : nettoyage de bureaux,
            résidences, centres de santé, hôtels, espaces commerciaux et fin de
            chantier. Nous intervenons également dans l'entretien de jardins, la
            création de potagers naturels, l'organisation d'événements
            éco-responsables et les services logistiques. Chaque service est
            pensé pour allier efficacité, qualité et respect de l'environnement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Produits */}
          <div>
            <h3 className="text-2xl font-bold text-[#212121] mb-6">
              Nos Produits
            </h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#14A800]/10 p-3 rounded-lg">
                    <Recycle size={32} className="text-[#14A800]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">
                      Poubelles ECOTRASH
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Poubelles écologiques personnalisées, fabriquées à partir
                      de déchets électroniques. Design durable et respectueux de
                      l'environnement.
                    </p>
                    <button className="text-[#14A800] font-semibold hover:underline">
                      En savoir plus →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#14A800]/10 p-3 rounded-lg">
                    <Leaf size={32} className="text-[#14A800]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">
                      Produits d'Entretien Écologiques
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Détergents, détartrants et nettoyants biodégradables, sans
                      substances nocives, pour une efficacité optimale en
                      respectant votre santé et la planète.
                    </p>
                    <button className="text-[#14A800] font-semibold hover:underline">
                      En savoir plus →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold text-[#212121] mb-6">
              Nos Services
            </h3>
            <div className="space-y-4">
              {[
                "Nettoyage professionnel (bureaux, résidences, industries)",
                "Création et entretien d'espaces verts",
                "Jardins potagers bio",
                "Gestion de déchets événementiels",
                "Transport et déménagement",
                "Formation aux métiers du nettoyage",
              ].map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle
                    size={20}
                    className="text-[#14A800] flex-shrink-0"
                  />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Voir tous nos services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Concepts
const ConceptsSection = () => {
  const concepts = [
    {
      title: "Entretien-Nettoyage courant & ponctuel",
      icon: "🧹",
      description:
        "Solutions de nettoyage professionnel pour tous types de locaux",
    },
    {
      title: "Conception, Création & Entretien d'espaces verts",
      icon: "🌿",
      description: "Aménagement paysager 3D et entretien d'espaces verts",
    },
    {
      title: "Création de Jardins Potagers bio",
      icon: "🥬",
      description: "Jardins potagers écologiques et durables",
    },
    {
      title: "Gestion de Déchets événementiels",
      icon: "♻️",
      description: "Collecte, tri et recyclage pour vos événements",
    },
    {
      title: "Entretien & Nettoyages événementiels",
      icon: "🎪",
      description: "Services complets avant, pendant et après événements",
    },
    {
      title: "Déménagement / Transport / Location",
      icon: "🚛",
      description: "Solutions logistiques complètes 24h/24 et 7j/7",
    },
    {
      title: "Hygiène et Propreté centres de santés",
      icon: "🏥",
      description: "Spécialistes de l'hygiène en milieu hospitalier",
    },
    {
      title: "Formation Technicien de surfaces",
      icon: "🎓",
      description: "Centre de formation aux métiers du nettoyage professionnel",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Nos Concepts
          </h2>
          <p className="text-xl text-gray-700">
            8 domaines d'expertise pour répondre à tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3 text-[#212121] leading-tight">
                {concept.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {concept.description}
              </p>
              <button className="w-full bg-[#14A800] hover:bg-[#128700] text-white py-2 px-4 rounded-lg font-medium transition-all group-hover:shadow-lg">
                Demander un Devis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Modes d'intervention
const InterventionModes = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Nos Modes d'Intervention
          </h2>
          <p className="text-xl text-gray-700">
            Deux modes d'intervention adaptés à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-[#14A800]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Star size={32} className="text-[#14A800]" />
            </div>
            <h3 className="text-2xl font-bold text-[#212121] mb-4">
              Interventions Ponctuelles
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              D'une part, des interventions ponctuelles telles que le nettoyage
              de fin de chantier, les entretiens généraux ou encore l'exécution
              de tâches spécifiques en une seule visite.
            </p>
            <ul className="space-y-2">
              {[
                "Nettoyage de fin de chantier",
                "Entretien général",
                "Intervention d'urgence",
                "Tâches spécifiques",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-[#14A800]" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-[#14A800]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Recycle size={32} className="text-[#14A800]" />
            </div>
            <h3 className="text-2xl font-bold text-[#212121] mb-4">
              Entretiens Courants
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              D'autre part, des entretiens courants, effectués de manière
              régulière selon un contrat mensuel, trimestriel, semestriel ou
              annuel.
            </p>
            <ul className="space-y-2">
              {[
                "Contrat mensuel",
                "Contrat trimestriel",
                "Contrat semestriel",
                "Contrat annuel",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-[#14A800]" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg">
            Demander un Devis Gratuit Maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

// Section "Ils nous font confiance"
const TrustSection = () => {
  const clients = [
    { name: "Pharmacie Solidarité", logo: "/api/placeholder/120/60" },
    { name: "CMS Notre Dame", logo: "/api/placeholder/120/60" },
    { name: "CHP Bassar", logo: "/api/placeholder/120/60" },
    { name: "Pharmacie Hygéa", logo: "/api/placeholder/120/60" },
    { name: "TECORP Architects", logo: "/api/placeholder/120/60" },
    { name: "KEC International", logo: "/api/placeholder/120/60" },
    { name: "Hôtel Mariama", logo: "/api/placeholder/120/60" },
    { name: "EDOLE Africa", logo: "/api/placeholder/120/60" },
  ];

  const partners = [
    { name: "Total Energies", logo: "/api/placeholder/120/60" },
    { name: "FECECAV", logo: "/api/placeholder/120/60" },
    { name: "Magic System Foundation", logo: "/api/placeholder/120/60" },
    { name: "R4C Togo", logo: "/api/placeholder/120/60" },
    { name: "CONFEJES", logo: "/api/placeholder/120/60" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Ils Nous Font Confiance
          </h2>
        </div>

        {/* Clients */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-[#212121]">
            Clients
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-[#212121]">
            Partenaires
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Pourquoi choisir AFRICA CLEAN
const WhyChooseUs = () => {
  const advantages = [
    {
      icon: <Leaf size={32} className="text-[#14A800]" />,
      title: "Produits Écologiques",
      description:
        "Utilisation exclusive de produits respectueux de l'environnement",
    },
    {
      icon: <Users size={32} className="text-[#14A800]" />,
      title: "Équipes Qualifiées",
      description:
        "Professionnels formés et expérimentés disponibles 24h/24 et 7j/7",
    },
    {
      icon: <Award color="#14A800" size={32} className="text-[#14A800]" />,
      title: "Prix Abordables",
      description:
        "Tarifs compétitifs avec 10% de réduction sur votre 1ère commande",
    },
    {
      icon: <MapPin size={32} className="text-[#14A800]" />,
      title: "Couverture Étendue",
      description:
        "Interventions dans toutes les régions du Togo et en Afrique de l'Ouest",
    },
  ];

  return (
    <section className="py-16 bg-[#14A800]/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            Pourquoi Choisir AFRICA CLEAN ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#212121] mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-[#14A800] rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">
            10% de réduction offerte sur votre 1ère commande !
          </h3>
          <button className="bg-white text-[#14A800] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Profiter de l'offre
          </button>
        </div>
      </div>
    </section>
  );
};

// Section CTA Contact
const ContactCTA = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous avez un Projet d'envergure à réaliser ?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Vous souhaitez discuter d'un partenariat B2B / B2C ? <br />
            Vous souhaitez tout simplement avoir des informations
            complémentaires ?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Contacts Infos</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-[#14A800]" />
                <span>Siège social: Djidjolé, derrière le CMS, Lomé-Togo</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeSimple size={20} className="text-[#14A800]" />
                <span>africaclean.contact@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-[#14A800]" />
                <span>+228 90 45 31 53 / +225 01 51 15 46 16</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">
              Demande de Partenariat ou d'Info Complémentaire
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-[#14A800] hover:bg-[#128700] text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                <WhatsappLogo size={20} />
                <span>Contactez-nous sur WhatsApp</span>
              </button>
              <button className="w-full border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                Envoyer un email
              </button>
              <button className="w-full border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                Demander un devis gratuit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Bouton WhatsApp flottant// Page d'accueil complète
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSummary />
      <ProductsServicesOverview />
      <ConceptsSection />
      <InterventionModes />
      <TrustSection />
      <WhyChooseUs />
      <ContactCTA />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default HomePage;

// Layout principal avec navigation (à créer séparément)
// Layout principal avec navigation (à créer séparément)

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/api/placeholder/120/40"
                alt="AFRICA CLEAN"
                className="h-10"
              />
              <span className="text-xl font-bold text-[#212121]">
                AFRICA CLEAN
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Accueil
              </a>
              <a
                href="/produits"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Produits
              </a>
              <a
                href="/services"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="/a-propos"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                À Propos
              </a>
              <a
                href="/galeries"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Galeries
              </a>
              <a
                href="/blog"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Blog
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-[#14A800] font-medium transition-colors"
              >
                Contact
              </a>
              <button className="bg-[#14A800] hover:bg-[#128700] text-white px-4 py-2 rounded-lg font-medium transition-all">
                Devis Gratuit
              </button>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/api/placeholder/120/40"
                  alt="AFRICA CLEAN"
                  className="h-8"
                />
                <span className="text-lg font-bold">AFRICA CLEAN</span>
              </div>
              <p className="text-gray-400 mb-4">
                Pour une Afrique Propre et Durable !
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1CPRhr5DdT/"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/africacleantg/"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/africacleanTg"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@AFRICACLEANSARL"
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/a-propos"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    À Propos
                  </a>
                </li>
                <li>
                  <a
                    href="/produits"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Produits
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/galeries"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Galerie
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/services/nettoie-pro"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Nettoyage Pro
                  </a>
                </li>
                <li>
                  <a
                    href="/services/eco-jardin"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Eco-Jardin
                  </a>
                </li>
                <li>
                  <a
                    href="/services/natura-potager"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Natura-Potager
                  </a>
                </li>
                <li>
                  <a
                    href="/services/eco-event"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Eco-Event
                  </a>
                </li>
                <li>
                  <a
                    href="/services/sante-pro"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Santé-Pro
                  </a>
                </li>
                <li>
                  <a
                    href="/services/fom-logistics"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FOM Logistics
                  </a>
                </li>
                <li>
                  <a
                    href="/quote"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Demander un Devis
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>Djidjolé, derrière le CMS, Lomé-Togo</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+228 90 45 31 53</span>
                </p>
                <p className="flex items-center space-x-2">
                  <EnvelopeSimple size={16} className="flex-shrink-0" />
                  <span>africaclean.contact@gmail.com</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 AFRICA CLEAN. Tous droits réservés. Pour une Afrique
              Propre et Durable !
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

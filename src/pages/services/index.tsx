import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Sparkle,
  Leaf,
  Recycle,
  Phone,
  Clock,
  Star,
} from "@phosphor-icons/react";
import {
  Building,
  SprayBottle,
  LetterCircleH,
  Park,
  CalendarDots,
  GraduationCap,
} from "@phosphor-icons/react";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";

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

  const concepts: ConceptDetail[] = [
    {
      id: "nettoie-pro",
      title: "Nettoie-Pro",
      subtitle: "Vos locaux toujours propres, notre engagement au quotidien",
      description:
        "Solutions de nettoyage professionnel pour tous types d'espaces avec une approche éco-responsable et des équipes qualifiées.",
      icon: <SprayBottle size={40} />,
      color: "#14A800",
      gradient: "from-green-500 to-green-600",
      services: [
        "Entretien courant de bureaux",
        "Entretien courant de maison",
        "Nettoyage des pharmacies et hôpitaux",
        "Désinfection et décontamination",
        "Entretien fin chantier",
        "Lavage à la machine",
        "Nettoyage en hauteur",
        "Nettoyage de luminaires",
        "Désinsectisation et dératisation",
      ],
      benefits: [
        "Équipes professionnelles et qualifiées",
        "Produits écologiques certifiés",
        "Intervention 24h/24 et 7j/7",
        "Matériel professionnel de pointe",
        "Respect des normes d'hygiène",
      ],
      images: [
        "/images/services/nettoie-pro-1.jpg",
        "/images/services/nettoie-pro-2.jpg",
        "/images/services/nettoie-pro-3.jpg",
      ],
      stats: [
        { label: "Clients satisfaits", value: "200+" },
        { label: "Interventions/mois", value: "500+" },
        { label: "Équipes formées", value: "50+" },
      ],
    },
    {
      id: "sante-pro",
      title: "Santé-Pro",
      subtitle:
        "Nous garantissons l'hygiène et la propreté dans vos centres de santé",
      description:
        "Expertise spécialisée en hygiène hospitalière et pharmaceutique avec des protocoles stricts et du personnel qualifié.",
      icon: <LetterCircleH size={40} />,
      color: "#DC2626",
      gradient: "from-red-500 to-red-600",
      services: [
        "Conception de plan d'hygiène sanitaire & de maintenance des bâtiments",
        "Entretien & Nettoyage courant des Pharmacies et Hôpitaux",
        "Désinfection, Décontamination",
        "Désinsectisation, Dératisation",
      ],
      benefits: [
        "Personnel formé aux normes hospitalières",
        "Protocoles de désinfection stricts",
        "Produits homologués pour le médical",
        "Respect des normes HACCP",
        "Intervention d'urgence possible",
      ],
      images: [
        "/images/services/sante-pro-1.jpg",
        "/images/services/sante-pro-2.jpg",
        "/images/services/sante-pro-3.jpg",
      ],
      stats: [
        { label: "Centres de santé", value: "15+" },
        { label: "Pharmacies", value: "20+" },
        { label: "Ans d'expérience", value: "6+" },
      ],
    },
    {
      id: "eco-jardin",
      title: "Eco-Jardin",
      subtitle: "Conception et création d'espaces verts durables",
      description:
        "Aménagement paysager professionnel avec conception 3D, création et entretien d'espaces verts respectueux de l'environnement.",
      icon: <Park size={40} />,
      color: "#22C55E",
      gradient: "from-green-400 to-green-500",
      services: [
        "Conception paysagiste 3D",
        "Création d'espaces verts : gazons, fleurs...",
        "Entretien d'espaces verts : arrosage, désherbage, tonte, et taille de haie",
        "Désinsectisation et fertilisation",
      ],
      benefits: [
        "Conception sur mesure avec plans 3D",
        "Sélection de plantes adaptées au climat",
        "Techniques d'arrosage économiques",
        "Entretien écologique sans pesticides",
        "Suivi personnalisé toute l'année",
      ],
      images: [
        "/images/services/eco-jardin-1.jpg",
        "/images/services/eco-jardin-2.jpg",
        "/images/services/eco-jardin-3.jpg",
      ],
      stats: [
        { label: "Jardins créés", value: "100+" },
        { label: "m² aménagés", value: "5000+" },
        { label: "Espèces plantées", value: "50+" },
      ],
    },
    {
      id: "natura-potager",
      title: "Natura-Potager",
      subtitle: "Jardins potagers biologiques pour une alimentation saine",
      description:
        "Création et gestion de potagers bio avec étude de sol, sélection de légumes adaptés et techniques de culture naturelle.",
      icon: <Leaf size={40} />,
      color: "#16A34A",
      gradient: "from-green-600 to-green-700",
      services: [
        "Étude de sol et proposition de légumes adaptés",
        "Plantation de différentes sortes de légumes",
        "Entretien et désinsectisation au besoin",
      ],
      benefits: [
        "Production de légumes 100% bio",
        "Techniques de permaculture",
        "Optimisation de l'espace disponible",
        "Formation à l'auto-gestion",
        "Récoltes toute l'année",
      ],
      images: [
        "/images/services/natura-potager-1.png",
        "/images/services/natura-potager-2.png",
        "/images/services/natura-potager-3.jpg",
      ],
      stats: [
        { label: "Potagers créés", value: "80+" },
        { label: "Familles nourries", value: "200+" },
        { label: "Variétés cultivées", value: "30+" },
      ],
    },
    {
      id: "eco-event",
      title: "Éco-Event",
      subtitle: "Gestion écologique des déchets événementiels",
      description:
        "Solutions complètes de gestion des déchets pour événements avec tri, recyclage et communication écologique.",
      icon: <Recycle size={40} />,
      color: "#0284C7",
      gradient: "from-blue-500 to-blue-600",
      services: [
        "Conception d'identité de Branding écologique",
        "Mise à disposition des poubelles brandées et personnalisées",
        "Collecte, tri et traitement de déchets événementiels",
        "Évacuation et recyclage des déchets",
      ],
      benefits: [
        "Événements zéro déchet possibles",
        "Poubelles personnalisées à votre image",
        "Tri sélectif professionnel",
        "Sensibilisation du public",
        "Bilan carbone réduit",
      ],
      images: [
        "/images/services/eco-event-1.jpg",
        "/images/services/eco-event-2.jpg",
        "/images/services/eco-event-3.jpg",
      ],
      stats: [
        { label: "Événements gérés", value: "150+" },
        { label: "Tonnes recyclées", value: "50+" },
        { label: "Participants sensibilisés", value: "10000+" },
      ],
    },
    {
      id: "nettoie-event",
      title: "Nettoie-Event",
      subtitle: "Nettoyage événementiel avant, pendant et après",
      description:
        "Services complets de nettoyage pour tous types d'événements avec intervention stratégique et équipes dédiées.",
      icon: <CalendarDots size={40} />,
      color: "#0EA5E9",
      gradient: "from-sky-500 to-sky-600",
      services: [
        "Conception de plan stratégique d'hygiène événementielle",
        "Entretien, nettoyage écologique, avant, pendant et après événement",
        "Désinfection et désinsectisation régulière des sites",
      ],
      benefits: [
        "Intervention en 3 phases complètes",
        "Équipes dédiées sur site",
        "Nettoyage en temps réel",
        "Gestion des urgences",
        "Respect des délais stricts",
      ],
      images: [
        "/images/services/nettoie-event-1.jpg",
        "/images/services/nettoie-event-2.jpg",
        "/images/services/nettoie-event-3.jpg",
      ],
      stats: [
        { label: "Événements nettoyés", value: "200+" },
        { label: "Heures d'intervention", value: "5000+" },
        { label: "Satisfaction client", value: "98%" },
      ],
    },
  ];

  const formations = [
    {
      title: "Technicien de surfaces : Agent de Nettoyage",
      duration: "2 semaines",
      image: "/images/formations/nettoyage.jpg",
    },
    {
      title:
        "Technicien de surfaces : Agent d'hygiène et de propreté en milieu hospitalier",
      duration: "3 semaines",
      image: "/images/formations/hospitalier.jpg",
    },
    {
      title: "Technicien de surfaces : Jardinier et/ou paysagiste",
      duration: "4 semaines",
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
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nos Services & Formations
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            6 concepts innovants et des formations professionnelles pour
            répondre à tous vos besoins
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("concepts")}
              className="bg-white text-[#14A800] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Découvrir nos concepts
            </button>
            <button
              onClick={() => scrollToSection("formations")}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
            >
              Nos formations
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
              key={concept.id}
              id={concept.id}
              data-section={concept.id}
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
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: concept.color, color: "white" }}
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
                      Nos prestations
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
                      Pourquoi nous choisir
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
                    <span>Demander un devis gratuit</span>
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
                Nos Formations
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Nous disposons d'un centre de formation professionnelle aux
              métiers d'hygiène, de propreté et des services associés
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#212121] mb-6">
                Programmes de Formation Disponibles
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
              Intéressé par nos formations ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous pour plus d'informations sur nos programmes de
              formation et les prochaines sessions disponibles.
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
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nos experts sont à votre disposition pour étudier vos besoins et
            vous proposer la solution adaptée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/quote")}
              className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Demander un devis gratuit
            </button>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
            >
              Nous contacter
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

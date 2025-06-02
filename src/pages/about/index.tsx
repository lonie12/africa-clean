import React, { useState } from "react";
import {
  User,
  Trophy,
  Users,
  Target,
  Heart,
  Eye,
  Handshake,
  ArrowRight,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  CheckCircle,
  Phone,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { Award } from "iconsax-react";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";

interface Achievement {
  year: string;
  title: string;
  description: string;
  organization: string;
  color: string;
}

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">(
    "mission"
  );

  const achievements: Achievement[] = [
    {
      year: "2020",
      title: "Lauréat PPEJ CONFEJES",
      description:
        "Meilleure entreprise jeune du secteur de nettoyages écologiques professionnels",
      organization: "CONFEJES",
      color: "#14A800",
    },
    {
      year: "2021",
      title: "Lauréat Foire Francophone #FFJGRD2021",
      description:
        "Meilleure initiative de la 2ème édition sur la Gestion et le Recyclage des Déchets",
      organization: "Foire Francophone",
      color: "#0284C7",
    },
    {
      year: "2021",
      title: "Lauréat AgriTalkture",
      description:
        "Concours de Pitch de meilleures initiatives estudiantines agro-écologiques urbaine",
      organization: "IAAS – TOGO",
      color: "#16A34A",
    },
    {
      year: "2021",
      title: "2ème Prix COJECC2021",
      description:
        "Protection de l'environnement avec le projet 'rendre les déchets Utiles'",
      organization: "PNUD Togo & ONG Jeunes Verts",
      color: "#DC2626",
    },
    {
      year: "2022",
      title: "Finaliste Total Energie",
      description:
        "Concours Startups avec le projet numérisation de la gestion des déchets",
      organization: "Total Energie",
      color: "#F59E0B",
    },
  ];

  const coreValues = [
    {
      icon: <Heart size={40} />,
      title: "Engagement Écologique",
      description:
        "Nous nous engageons à protéger l'environnement à travers des pratiques durables et des produits écologiques.",
      color: "#16A34A",
    },
    {
      icon: <Users size={40} />,
      title: "Excellence du Service",
      description:
        "Nous visons l'excellence dans chaque intervention avec des équipes formées et du matériel professionnel.",
      color: "#14A800",
    },
    {
      icon: <Handshake size={40} />,
      title: "Partenariat Durable",
      description:
        "Nous construisons des relations de confiance à long terme avec nos clients et partenaires.",
      color: "#0284C7",
    },
    {
      icon: <Award color="white" size={40} />,
      title: "Innovation Continue",
      description:
        "Nous innovons constamment pour proposer des solutions toujours plus efficaces et respectueuses.",
      color: "#7C3AED",
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
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                À Propos d'Africa Clean
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Depuis 2018, nous rendons vos locaux propres et durables avec
                une approche éco-responsable et des solutions innovantes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("histoire")}
                  className="bg-white text-[#14A800] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Notre Histoire
                </button>
                <button
                  onClick={() => scrollToSection("equipe")}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
                >
                  Rencontrer l'équipe
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Pour une Afrique Propre et Durable !
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">6+</div>
                    <div className="text-sm opacity-90">
                      Années d'expérience
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">
                      200+
                    </div>
                    <div className="text-sm opacity-90">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">6</div>
                    <div className="text-sm opacity-90">Concepts innovants</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">5</div>
                    <div className="text-sm opacity-90">Prix remportés</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Trophy size={40} />
        </div>
        <div
          className="absolute bottom-20 right-10 opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <Target size={35} />
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-8">
            Qui sommes-nous ?
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-[#14A800]">Africa Clean</strong> propose
              des solutions professionnelles et écologiques adaptées à vos
              besoins : nettoyage de bureaux, résidences, centres de santé,
              hôtels, espaces commerciaux et fin de chantier.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nous intervenons également dans l'entretien de jardins, la
              création de potagers naturels, l'organisation d'événements
              éco-responsables et les services logistiques.
            </p>
            <p className="text-xl font-semibold text-[#14A800]">
              Chaque service est pensé pour allier efficacité, qualité et
              respect de l'environnement.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section
        id="histoire"
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Un parcours d'innovation et d'engagement pour l'environnement
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Calendar size={30} className="text-[#14A800] mr-4" />
                  <h3 className="text-2xl font-bold text-[#212121]">
                    Les Débuts (2018)
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  La Société <strong>AFRICA CLEAN</strong> fut créée en 2018
                  sous le nom de <strong>GROUPE LUMIERE JEUNESSE</strong>. Au
                  départ, l'entreprise assurait des prestations d'entretien et
                  nettoyage professionnels des locaux ainsi que la conception,
                  la réalisation et l'entretien d'espaces verts et de jardins
                  potagers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cependant, la société a étendu ses activités pour inclure la
                  gestion de déchets et le nettoyage événementiels, le
                  déménagement et le transport des biens et marchandises, ainsi
                  que la fabrication des poubelles écologiques et
                  personnalisées.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Star size={30} className="text-[#14A800] mr-4" />
                  <h3 className="text-2xl font-bold text-[#212121]">
                    Évolution (2023)
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  En 2023, l'entreprise a changé de nom pour devenir{" "}
                  <strong className="text-[#14A800]">AFRICA CLEAN</strong>, afin
                  de mieux refléter sa mission de fournir des services de
                  nettoyage et d'entretien de qualité supérieure à sa clientèle,
                  avec une vision élargie vers toute l'Afrique.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline des récompenses */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#212121] text-center mb-12">
              Nos Distinctions
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#14A800] h-full hidden lg:block"></div>

              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:flex`}
                  >
                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                      } mb-4 lg:mb-0`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                            style={{ backgroundColor: achievement.color }}
                          >
                            {achievement.year}
                          </div>
                          <h4 className="font-bold text-lg text-[#212121]">
                            {achievement.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 mb-2">
                          {achievement.description}
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: achievement.color }}
                        >
                          {achievement.organization}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden lg:block w-4 h-4 rounded-full bg-[#14A800] border-4 border-white shadow-lg z-10"></div>

                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Notre Mission, Vision & Valeurs
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Les piliers qui guident notre engagement quotidien
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-2 flex space-x-2">
              {[
                {
                  key: "mission",
                  label: "Mission",
                  icon: <Target size={20} />,
                },
                { key: "vision", label: "Vision", icon: <Eye size={20} /> },
                { key: "values", label: "Valeurs", icon: <Heart size={20} /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(tab.key as "mission" | "vision" | "values")
                  }
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-[#14A800] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "mission" && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-8 lg:p-12 text-center">
                <Target size={60} className="text-[#14A800] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212121] mb-6">
                  Notre Mission
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Chez <strong className="text-[#14A800]">AFRICA CLEAN</strong>,
                  nous mettons la technologie et l'innovation au service de
                  l'hygiène et de l'environnement, avec un objectif clair : vous
                  offrir des solutions efficaces, durables et personnalisées
                  pour une Afrique propre et durable.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 lg:p-12 text-center">
                <Eye size={60} className="text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212121] mb-6">
                  Notre Vision
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Devenir le leader africain des solutions écologiques de
                  nettoyage et d'entretien, en contribuant activement à la
                  création d'un environnement propre et durable pour les
                  générations futures à travers l'innovation et l'excellence du
                  service.
                </p>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid md:grid-cols-2 gap-8">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
                    style={{ borderColor: value.color }}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="p-3 rounded-full mr-4"
                        style={{ backgroundColor: value.color, color: "white" }}
                      >
                        {value.icon}
                      </div>
                      <h4 className="text-xl font-bold text-[#212121]">
                        {value.title}
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Équipe Section */}
      <section
        id="equipe"
        className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Rencontrez Notre Équipe
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Des professionnels passionnés au service de votre satisfaction
            </p>
          </div>

          {/* Promoteur Profile */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/3 bg-gradient-to-br from-[#14A800] to-[#128700] p-8 text-white text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                    <img
                      src="/images/team/lucien-agbeko.jpg"
                      alt="AGBEKO Koffi Lucien"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/Lucien-Koffi-Agbeko.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    AGBEKO Koffi Lucien
                  </h3>
                  <p className="text-lg opacity-90 mb-4">Promoteur Gérant</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="tel:+22890453153"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <a
                      href="mailto:africaclean.contact@gmail.com"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <EnvelopeSimple size={20} />
                    </a>
                  </div>
                </div>

                <div className="lg:w-2/3 p-8 lg:p-12">
                  <h4 className="text-2xl font-bold text-[#212121] mb-6">
                    Parcours & Expertise
                  </h4>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <GraduationCap
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                          Formation Académique
                        </h5>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Licence en Économie et Gestion</li>
                          <li>
                            • BAC+4 en Gestion de Projet (spécialisé en projets
                            agricoles et environnementaux)
                          </li>
                          <li>
                            • Licence en Science de l'Éducation et de la
                            Formation
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Briefcase
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                          Formations Complémentaires
                        </h5>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Économie circulaire et Gestion de déchets</li>
                          <li>• Ingénierie de surfaces</li>
                          <li>• Entrepreneuriat et Marketing digital</li>
                          <li>• Transport et logistiques</li>
                          <li>• Gestion de ressources humaines</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <User
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                          Expérience
                        </h5>
                        <p className="text-gray-700">
                          Ayant débuté en tant que technicien de surface pour
                          subvenir à ses besoins dès sa première année
                          universitaire, il a mis ses compétences
                          organisationnelles et entrepreneuriales à profit pour
                          fonder l'entreprise qui est désormais l'un des leaders
                          dans le domaine des services de nettoyage et
                          d'entretien au Togo et en Afrique.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Values */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#212121] mb-8">
              Rejoignez Notre Équipe
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Vous partagez nos valeurs et souhaitez contribuer à une Afrique
              plus propre et durable ? Nous recherchons constamment des talents
              passionnés pour rejoindre notre mission.
            </p>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto space-x-2"
            >
              <Users size={20} />
              <span>Rejoindre l'équipe</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Africa Clean */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi Choisir Africa Clean ?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              6 raisons qui font de nous votre partenaire de confiance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle size={40} />,
                title: "Produits Écologiques",
                description:
                  "Utilisation exclusive de produits respectueux de l'environnement",
              },
              {
                icon: <Award color="yellow" size={40} />,
                title: "Matériels Professionnels",
                description:
                  "Équipements et procédés ayant un moindre impact environnemental",
              },
              {
                icon: <Users size={40} />,
                title: "Équipes Qualifiées",
                description:
                  "Professionnels formés et disponibles 24h/24 & 7j/7",
              },
              {
                icon: <Star size={40} />,
                title: "Prix Abordables",
                description:
                  "Tarifs compétitifs avec 10% de réduction sur votre 1ère commande",
              },
              {
                icon: <MapPin size={40} />,
                title: "Couverture Étendue",
                description:
                  "Interventions dans toutes les régions du Togo et en Afrique de l'ouest",
              },
              {
                icon: <Heart size={40} />,
                title: "Satisfaction Client",
                description:
                  "Engagement qualité avec suivi personnalisé de chaque prestation",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center"
              >
                <div className="text-yellow-300 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                10% de réduction offerte !
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Sur votre première commande pour découvrir la qualité de nos
                services
              </p>
              <button
                onClick={() => (window.location.href = "/quote")}
                className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Profiter de l'offre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
            Prêt à démarrer avec nous ?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et
            découvrir comment nous pouvons vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </button>
            <button
              onClick={() => (window.location.href = "/quote")}
              className="border-2 border-[#14A800] text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-[#14A800] hover:text-white transition-all duration-300"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default AboutPage;

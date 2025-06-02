import { Leaf, MapPin, Users } from "@phosphor-icons/react";
import { Award } from "iconsax-react";

const WhyChooseUs: React.FC = () => {
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

export default WhyChooseUs;

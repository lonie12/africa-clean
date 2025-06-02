import { CheckCircle, Recycle, Star } from "@phosphor-icons/react";

const InterventionModes: React.FC = () => {
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

export default InterventionModes;

import { CheckCircle, Leaf, Recycle } from "@phosphor-icons/react";

const ProductsServicesOverview: React.FC = () => {
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
                    <a
                      href="/produits#ecotrash"
                      className="text-[#14A800] font-semibold hover:underline"
                    >
                      En savoir plus →
                    </a>
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
                    <a
                      href="/produits#ecoclean"
                      className="text-[#14A800] font-semibold hover:underline"
                    >
                      En savoir plus →
                    </a>
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
            <a href="/services" className="mt-6 bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Voir tous nos services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsServicesOverview;

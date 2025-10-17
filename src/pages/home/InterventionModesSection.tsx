import { CheckCircle, Recycle, Star } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const ICONS: Record<string, React.ElementType> = {
  Star,
  Recycle,
};
type tabType= {
  title:string
    icon:string,
    description: string,
    items:[]
}

const InterventionModes: React.FC = () => {
  const { t } = useTranslation();
  const tab = t("interventionModes.tab", { returnObjects: true }) as tabType[];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* --- Titre et description --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            {t("interventionModes.title")}
          </h2>
          <p className="text-xl text-gray-700">
            {t("interventionModes.description")}
          </p>
        </div>

        {/* --- Cartes en pleine largeur --- */}
        <div className="flex gap-8">
          {Array.isArray(tab) &&
            tab.map((item, idx) => {
              const Icon = ICONS[item.icon] || Star;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl shadow-lg w-full"
                >
                  <div className="bg-[#14A800]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon size={32} className="text-[#14A800]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#212121] mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2">
                    {item.items.map((listItem: string, i: number) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-[#14A800]" />
                        <span className="text-gray-600">{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>

        {/* --- Bouton --- */}
        <div className="text-center mt-12">
          <button className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg">
            {t('cover.freeQuoteNow')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InterventionModes;

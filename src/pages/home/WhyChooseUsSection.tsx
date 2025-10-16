import { Leaf, MapPin, Users,Trophy } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface AdvantagesType{
icone:string,
title:string,
description:string
}
  const IconMap :Record<string,React.ElementType>={
  Trophy,
  MapPin,
  Leaf,
  Users
  }
const WhyChooseUs: React.FC = () => {
  const {t}= useTranslation()
  const advantages = t('whyChooseUs.advantages',{returnObjects:true}) as AdvantagesType[]


  return (
    <section className="py-16 bg-[#14A800]/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            {t('whyChooseUs.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = IconMap[advantage.icone]
            return(
            <div key={index} className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                 <Icon size={32} className="text-[#14A800]" />
              </div>
              <h3 className="text-xl font-semibold text-[#212121] mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          )})}
        </div>

        <div className="text-center mt-12 p-8 bg-[#14A800] rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">
            {t('whyChooseUs.footerDescription')}
          </h3>
          <button className="bg-white text-[#14A800] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            {t('whyChooseUs.footerButton')}

          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

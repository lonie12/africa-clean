import {
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const ContactCTA: React.FC = () => {
  const {t}= useTranslation()
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contactCTA.title')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('contactCTA.description')}<br/>
             {t('contactCTA.secondDescription')}

          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">{t('cover.contactInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-[#14A800]" />
                <span>{t('cover.headOffice')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeSimple size={20} className="text-[#14A800]" />
                <span>africaclean.contact@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-[#14A800]" />
                <span>+228 90 45 31 53 / +225 01 52 89 16 90</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">
              {t('homeContact.title')}
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-[#14A800] hover:bg-[#128700] text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                <WhatsappLogo size={20} />
                <span>{t('homeContact.whatsappContact')}</span>
              </button>
              <button className="w-full border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-semibold transition-all">
              {t('cover.emailContact')}
              </button>
              <button className="w-full border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-semibold transition-all">
              {t('cover.giveFreeQuote')}

              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

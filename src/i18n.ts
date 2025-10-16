import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./mock/en.json";
import fr from "./mock/fr.json";

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next) // intègre i18next à React
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: "fr", // langue par défaut
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },
  });

export default i18n;

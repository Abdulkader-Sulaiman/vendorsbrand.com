import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import translationEN from "../public/assets/locales/en/translation.json";
  import translationAR from "./locales/ar/translation.json";
 import translationDe from "./locales/de/translation.json";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar", "de"];

const resources = {
  en: {
    // translation: translationEN
  },
  ar: {
     translation: translationAR
  },
  de: {
     translation: translationDe
  }
};

i18n
  .use(initReactI18next)
  
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;

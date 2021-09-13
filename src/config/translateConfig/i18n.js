import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import faTranslate from "../../assets/translation/fa.json";

const resources = {
  fa: {
    translation: faTranslate,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fa",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

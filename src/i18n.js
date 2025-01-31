import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

// import LanguageDetector from 'i18next-browser-languagedetector';


i18next.use(I18nextBrowserLanguageDetector).use(initReactI18next).init({
    debug: true,
 lng: 'he', // if you're using a language detector, do not define the lng option
  resources: {
    en: {
      translation: {
        home: "HOME",
        collection: "COLLECTION",
        about : "ABOUT",
        contact: "CONTACT",
        filters:"FILTERS",
        categories: "CATEGORIES",
        type:"TYPE"
      }
    },
    he: {
        translation: {
            home: "בית",
            collection: "מוצרים",
            about : "אודות",
            contact: "צור קשר",
            filters:"מסנן",
            categories: "קטגוריות",
            type:"סוג"
        }
    }
  }
});

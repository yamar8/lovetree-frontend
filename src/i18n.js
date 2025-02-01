import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

// import LanguageDetector from 'i18next-browser-languagedetector';


i18next.use(i18nextBrowserLanguageDetector).use(initReactI18next).init({
    debug: true,
 lng: 'he', // if you're using a language detector, do not define the lng option
 fallbackLng: "en",
  resources: {
    en: {
      translation: {
        home: "HOME",
        collection: "COLLECTION",
        about : "ABOUT",
        contact: "CONTACT",
        filters:"FILTERS",
        categories: "CATEGORIES",
        type:"TYPE",
        subtotal:"SUBTOTAL",
        shipping_fee:"Shipping Fee",
        total:"Total",
        my_profile:"My Profile",
        orders: "Orders",
        logout: "Logout"
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
            type:"סוג",
            subtotal:"סכום ביניים",
            shipping_fee:"עלות משלוח",
            total:'סה"כ',
            my_profile:"הפרופיל שלי",
            orders: "הזמנות",
            logout: "התנתק"
        }
    }
  }
});

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";

import en from "./translations/en.json";

interface Language {
    [key: string]: string | Language;
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: getLocales()[0].languageCode,
        fallbackLng: "en",
        compatibilityJSON: "v3",
        // the translations
        resources: {
            en: {
                translation: en,
            },
            // es: {
            //     translation: es,
            // },
        },
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

// This is a hack to check if all keys are present in all languages, it will only run in development mode
// This will take en as the base language and check if all keys are present in all languages
if (__DEV__) {
    const checkKeys = (keys: string[], language: Language) => {
        for (const key of keys) {
            if (!language[key]) {
                console.warn(`Missing key ${key} in ${language}`);
            }

            if (typeof language[key] === "object") {
                checkKeys(Object.keys(language[key] as Language), language[key] as Language);
            }
        }
    };

    const keys = Object.keys(en);
    const languages: Language[] = [];

    for (const language of languages) {
        checkKeys(keys, language);
    }
}

export default i18n;

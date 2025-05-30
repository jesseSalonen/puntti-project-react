import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import dashboard_en from "./en/Dashboard.json";
import dashboard_fi from "./fi/Dashboard.json";
import exercises_en from "./en/Exercises.json";
import exercises_fi from "./fi/Exercises.json";
import login_en from "./en/Login.json";
import login_fi from "./fi/Login.json";
import register_en from "./en/Register.json";
import register_fi from "./fi/Register.json";
import common_en from "./en/Common.json";
import common_fi from "./fi/Common.json";
import workout_en from "./en/Workouts.json";
import workout_fi from "./fi/Workouts.json";
import programs_en from "./en/Programs.json";
import programs_fi from "./fi/Programs.json";
import workoutSessions_en from "./en/WorkoutSessions.json";
import workoutSessions_fi from "./fi/WorkoutSessions.json";

const translationResources = {
  en: {
    // Namespaces
    dashboard: dashboard_en,
    exercises: exercises_en,
    login: login_en,
    register: register_en,
    common: common_en,
    workouts: workout_en,
    programs: programs_en,
    workoutSessions: workoutSessions_en,
  },
  fi: {
    dashboard: dashboard_fi,
    exercises: exercises_fi,
    login: login_fi,
    register: register_fi,
    common: common_fi,
    workouts: workout_fi,
    programs: programs_fi,
    workoutSessions: workoutSessions_fi,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "fi",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: translationResources,
  });

export default i18n;
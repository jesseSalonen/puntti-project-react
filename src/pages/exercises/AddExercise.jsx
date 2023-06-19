import React from "react";
import { useTranslation } from "react-i18next";
import ExerciseForm from "../../components/exercises/ExerciseForm";

function AddExercise() {
  const { t } = useTranslation("exercises");

  return (
    <>
      <div className="mb-12 py-0 px-5 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("dashboard")}</h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("addExercisesFromBelow")}
        </p>
      </div>
      <ExerciseForm />
    </>
  );
}

export default AddExercise;

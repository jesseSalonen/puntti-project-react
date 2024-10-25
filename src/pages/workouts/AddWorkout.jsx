import React from "react";
import { useTranslation } from "react-i18next";
import WorkoutForm from "../../components/workouts/WorkoutForm";

function AddWorkout() {
  const { t } = useTranslation("workouts");

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <div className="mb-12 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("dashboard")}</h1>
      </div>
      <WorkoutForm />
    </div>
  );
}

export default AddWorkout;

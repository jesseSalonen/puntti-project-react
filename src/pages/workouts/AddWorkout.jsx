import React from "react";
import { useTranslation } from "react-i18next";
import WorkoutForm from "../../components/workouts/WorkoutForm";
import ExerciseTable from "../exercises/ExerciseTable";

function AddWorkout() {
  const { t } = useTranslation("workouts");

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <div className="mb-12 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("dashboard")}</h1>
      </div>
      <WorkoutForm />
      <ExerciseTable />
      <div className="mb-3">
        <button
          className="
              mb-5 
              flex 
              w-full 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-md 
              bg-gradient-to-r
              from-green-400
              to-green-500
              py-3 
              px-5 
              text-center 
              text-base 
              font-bold 
              text-green-800
              hover:scale-95
            "
          type="submit"
        >
          {t("addWorkouts")}
        </button>
      </div>
    </div>
  );
}

export default AddWorkout;

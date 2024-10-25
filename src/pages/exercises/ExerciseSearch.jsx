import React from "react";
import { useTranslation } from "react-i18next";
import ExerciseTable from "./ExerciseTable";

function ExerciseSearch() {
  const { t } = useTranslation("exercises");

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <div className="mb-12 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("exercises")}</h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("searchExercisesFromBelow")}
        </p>
      </div>
      <ExerciseTable />
    </div>
  );
}

export default ExerciseSearch;

import React from "react";
import { useTranslation } from "react-i18next";
import ExerciseTable from "../../components/exercises/ExerciseTable";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function ExerciseSearch() {
  const { t } = useTranslation("exercises");

  return (
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-3/4">
      <div className="mb-6 flex flex-col items-center py-0 font-bold md:mb-12">
        <h1 className="mb-4 text-4xl md:text-5xl">{t("exercises")}</h1>
        <p className="text-center text-2xl text-gray-400 md:text-4xl">
          {t("searchExercisesFromBelow")}
        </p>
      </div>
      
      <div className="mb-6 flex justify-end">
        <Link to="/exercises/add">
          <button className="
            flex
            cursor-pointer
            items-center
            justify-center
            rounded-md
            bg-gradient-to-r
            from-green-500
            to-green-100
            py-3
            px-5
            max-md:py-2
            max-md:px-3
            text-green-800
            max-w-xs
            whitespace-nowrap
          ">
            <FaPlus className="mr-2" />
            {t("createExercise")}
          </button>
        </Link>
      </div>
      
      <ExerciseTable />
    </div>
  );
}

export default ExerciseSearch;

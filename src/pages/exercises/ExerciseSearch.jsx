import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  reset,
  selectExercises,
} from "../../features/exercises/exerciseSlice";
import Spinner from "../../components/common/Spinner";
import ExerciseTable from "./ExerciseTable";

function ExerciseSearch() {
  const { t } = useTranslation("exercises");
  const dispatch = useDispatch();

  const { exercises, isLoading, isError, message } =
    useSelector(selectExercises);

  useEffect(() => {
    dispatch(getExercises());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <div className="mb-12 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("exercises")}</h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("searchExercisesFromBelow")}
        </p>
      </div>
      <ExerciseTable data={exercises} />
    </div>
  );
}

export default ExerciseSearch;

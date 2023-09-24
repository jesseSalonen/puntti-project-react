import React, { useEffect } from "react";
import { toast } from "react-toastify";

import ExerciseItem from "../../components/exercises/ExerciseItem";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  reset,
  selectExercises,
} from "../../features/exercises/exerciseSlice";
import Spinner from "../../components/Spinner";

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
    <>
      <div className="mx-auto w-3/4 max-sm:w-11/12">
        {exercises.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise._id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <h3>{t("noExercises")}</h3>
        )}
      </div>
    </>
  );
}

export default ExerciseSearch;

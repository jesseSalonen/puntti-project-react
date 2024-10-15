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
    <div>
      <h1>{t("exerciseSearch")}</h1>
      <ExerciseTable data={exercises} />
    </div>
  );
}

export default ExerciseSearch;

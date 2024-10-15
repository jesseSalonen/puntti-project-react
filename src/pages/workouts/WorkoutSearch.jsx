import React, { useEffect } from "react";
import { toast } from "react-toastify";

import WorkoutItem from "../../components/workouts/WorkoutItem";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkouts,
  reset,
  selectWorkouts,
} from "../../features/workouts/workoutSlice";
import Spinner from "../../components/common/Spinner";

function WorkoutSearch() {
  const { t } = useTranslation("workouts");
  const dispatch = useDispatch();
console.log(useSelector(selectWorkouts))
  const { workouts, isLoading, isError, message } =
    useSelector(selectWorkouts);

  useEffect(() => {
    dispatch(getWorkouts());

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
        {workouts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {workouts.map((workouts) => (
              <WorkoutItem key={workouts._id} workouts={workouts} />
            ))}
          </div>
        ) : (
          <h3>{t("noWorkouts")}</h3>
        )}
      </div>
    </>
  );
}

export default WorkoutSearch;

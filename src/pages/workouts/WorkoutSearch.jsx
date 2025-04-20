import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import WorkoutItem from "../../components/workouts/WorkoutItem";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkouts,
  reset,
  selectWorkouts,
} from "../../features/workouts/workoutSlice";
import Spinner from "../../components/common/Spinner";
import {FaPlus} from 'react-icons/fa';

function WorkoutSearch() {
  const { t } = useTranslation("workouts");
  const dispatch = useDispatch();
  const { workouts, isLoading, isError, message } = useSelector(selectWorkouts);

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
        <div className="mb-6 flex justify-end">
          <Link to="/workouts/add">
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
              {t("addWorkout")}
            </button>
          </Link>
        </div>
        {workouts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout} />
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

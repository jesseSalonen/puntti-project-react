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

function WorkoutSearch() {
  const { t } = useTranslation("workouts");
  const dispatch = useDispatch();
  const { workouts, isLoading, isError, message } = useSelector(selectWorkouts);

  const linkButton = (buttonText) => {
    return (
      <button
        className="
          flex 
          cursor-pointer
          items-center 
          justify-center 
          rounded-md 
          bg-[#222C34]
          py-3 
          px-5 
          text-center 
          text-white
          hover:bg-[#3A4549]
          hover:text-green-700
          max-md:hidden
        "
      >
        {t(buttonText)}
      </button>
    );
  };

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
          <>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {workouts.map((workout) => (
                <WorkoutItem key={workout._id} workout={workout} />
              ))}
            </div>
            <ul>
              <li>
                <Link to="/workouts/add">{linkButton("addWorkouts")}</Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h3>{t("noWorkouts")}</h3>
            <ul>
              <li>
                <Link to="/workouts/add">{linkButton("addWorkouts")}</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default WorkoutSearch;

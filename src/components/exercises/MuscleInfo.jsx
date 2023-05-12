import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { getMuscles, reset } from "../../features/muscles/muscleSlice";
import Spinner from "../Spinner";

function MuscleInfo({ setAddMuscleModalOpen }) {
  const { t } = useTranslation("dashboard");
  const { muscles, isLoading, isError, message } = useSelector(
    (state) => state.muscles
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getMuscles());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="
        mb-5
        rounded-md
        border
        border-solid
        border-gray-200
        p-6
        drop-shadow-md
        dark:border-gray-600
        max-sm:p-2
      "
    >
      <h2 className="mb-3 block w-full text-left text-lg font-semibold">
        {t("exerciseMuscleInfo")}
      </h2>
      <div className="flex gap-6 p-4 max-sm:flex-col max-sm:gap-0">
        <div className="mb-3 w-full">
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="muscleList"
          >
            {t("exerciseMuscles")}
          </label>
          <select
            className="mb-3 w-full rounded-md border border-solid dark:border-gray-600 dark:bg-[#1b252e]"
            name="muscleList"
            id="muscleList"
            onChange={(e) => addMuscle(e.target.value)}
            defaultValue={"default"}
          >
            <option value={"default"}>{t("ChooseExerciseMuscle")}</option>
            {muscles.map((muscle) => (
              <option value={muscle.id}>{muscle.name}</option>
            ))}
          </select>
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="newMuscle"
          >
            {t("noMuscle")}
          </label>
          <button
            className="
              flex 
              w-full 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-md 
              bg-gradient-to-r
              from-green-300
              to-green-100 
              py-2
              px-3
              text-center 
              text-base 
              font-bold 
              text-green-800
              hover:scale-95
            "
            onClick={() => setAddMuscleModalOpen(true)}
            type="button"
          >
            {t("addMuscle")}
          </button>
        </div>
        <div className="flex w-full flex-col self-stretch">
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="muscleList"
          >
            {t("selectedMuscles")}
          </label>
          <div
            className="h-full rounded-md border border-solid dark:border-gray-600 dark:bg-[#1b252e]"
            name="muscleList"
            id="muscleList"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MuscleInfo;

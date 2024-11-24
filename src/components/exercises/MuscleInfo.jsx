import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";

import {
  getMuscles,
  reset,
  selectMuscles,
} from "../../features/muscles/muscleSlice";
import Spinner from "../common/Spinner";

function MuscleInfo({
  addMuscle,
  removeMuscle,
  setAddMuscleModalOpen,
  exerciseMuscles,
}) {
  const { t } = useTranslation("dashboard");
  const { muscles, isLoading, isError, message } = useSelector(selectMuscles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMuscles());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const getMuscleNameFromId = (id) => {
    const muscleWithId = muscles.find((muscle) => muscle._id === id);
    if (muscleWithId) {
      return muscleWithId.name;
    }
    return "";
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-5 rounded-md border border-solid border-gray-200 p-6 drop-shadow-md dark:border-gray-600 max-sm:p-2">
      <h2 className="mb-3 block w-full text-left text-lg font-semibold">
        {t("exerciseMuscleInfo")}
      </h2>
      <div className="flex gap-6 p-4 max-sm:flex-col">
        <div className="w-full">
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
            value="default"
          >
            <option value={"default"}>{t("ChooseExerciseMuscle")}</option>
            {muscles.map((muscle) => (
              <option key={`muscle_${muscle._id}`} value={muscle._id}>
                {muscle.name}
              </option>
            ))}
          </select>
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="newMuscle"
          >
            {t("noMuscle")}
          </label>
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-green-300 to-green-100 py-2 px-3 text-center text-base font-bold text-green-800 hover:scale-95"
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
            className="flex h-full min-h-[45px] flex-wrap content-start items-start rounded-md border border-solid dark:border-gray-600 dark:bg-[#1b252e]"
            name="muscleList"
            id="muscleList"
          >
            {exerciseMuscles.map((muscleId) => (
              <div
                key={`exerciseMuscle_${muscleId}`}
                className="m-1 flex w-fit items-center justify-center gap-y-0 rounded-md border border-solid bg-green-400 py-1 px-2 dark:border-gray-600"
              >
                <div className="mr-2">{getMuscleNameFromId(muscleId)}</div>
                <div
                  onClick={() => removeMuscle(muscleId)}
                  className="cursor-pointer"
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MuscleInfo;

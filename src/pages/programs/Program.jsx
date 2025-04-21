import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getProgram, reset, selectPrograms, updateProgram} from '../../features/programs/programSlice.js';
import {toast} from 'react-toastify';
import Spinner from '../../components/common/Spinner.jsx';
import GenericProgramInfo from '../../components/programs/GenericProgramInfo.jsx';
import {FaArrowDown, FaArrowUp, FaPlus, FaTrash} from 'react-icons/fa';
import {getWorkouts, selectWorkouts} from '../../features/workouts/workoutSlice.js';

function Program() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState([]);

  const { t } = useTranslation(['programs', 'common']);
  const { id } = useParams();
  const dispatch = useDispatch();

  const {currentProgram, isLoading, isError, isSuccess, message} = useSelector(selectPrograms);
  const { workouts, isLoading: workoutsLoading, isError: workoutsIsError, message: workoutsMessage } = useSelector(selectWorkouts);

  useEffect(() => {
    dispatch(getProgram(id));
    dispatch(getWorkouts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (workoutsIsError) {
      toast.error(workoutsMessage);
    }
  }, [isError, message, workoutsIsError, workoutsMessage]);

  useEffect(() => {
    if (currentProgram) {
      setName(currentProgram.name);
      setDescription(currentProgram.description || "");
      setSchedule(currentProgram.schedule.map((day) => ({
        ...day,
        ...(day.type === 'workout' && { workout: day.workout._id}),
      })));
    }
  }, [currentProgram]);

  // Handle successful update
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('programUpdated'));
    }
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate that name is provided
    if (!name.trim()) {
      toast.error(t('programNameRequired'));
      return;
    }

    // validate that program has at least one day in schedule
    if (schedule.length === 0) {
      toast.error(t('programMustHaveDays'));
      return;
    }

    // Validate that all workout days have a selected workout
    const daysWithMissingWorkouts = schedule.filter(
      day => day.type === 'workout' && !day.workout
    );

    if (daysWithMissingWorkouts.length > 0) {
      toast.error(t('allWorkoutDaysMustHaveWorkout'));
      return;
    }

    dispatch(
      updateProgram({
        id,
        programData: { name, description, schedule },
      })
    );
  };

  const handleAddWorkoutDay = () => {
    setSchedule([...schedule, { type: 'workout', workout: '' }]);
  };

  const handleAddRestDay = () => {
    setSchedule([...schedule, { type: 'rest' }]);
  };

  const handleRemoveDay = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleMoveDay = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === schedule.length - 1)
    ) {
      return;
    }

    const newSchedule = [...schedule];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap the days
    [newSchedule[index], newSchedule[targetIndex]] =
      [newSchedule[targetIndex], newSchedule[index]];

    setSchedule(newSchedule);
  };

  const handleSelectWorkout = (index, workoutId) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], workout: workoutId };
    setSchedule(newSchedule);
  };

  if (isLoading || workoutsLoading) {
    return <Spinner />;
  }

  console.log(currentProgram);
  return (
    <div className="mx-auto w-11/12 lg:w-3/4">
      <div className="mb-8 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-2 text-4xl lg:text-5xl">{t("editProgram")}</h1>
      </div>
      <form onSubmit={onSubmit}>
        <GenericProgramInfo
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
        />

        <div className="mt-8 mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">{t("programSchedule")}</h2>
            <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-100">
              {schedule.length}
            </span>
          </div>

          <div className="mb-4 flex space-x-2">
            <button
              type="button"
              className="flex items-center justify-center rounded-md bg-green-100 py-2 px-4 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
              onClick={handleAddWorkoutDay}
            >
              <FaPlus className="mr-2" /> {t("addWorkout", {ns: 'workouts'})}
            </button>

            <button
              type="button"
              className="flex items-center justify-center rounded-md bg-blue-100 py-2 px-4 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
              onClick={handleAddRestDay}
            >
              <FaPlus className="mr-2" /> {t("addRestDay")}
            </button>
          </div>

          {schedule.length > 0 ? (
            <div className="space-y-4">
              {schedule.map((day, index) => (
                <div
                  key={index}
                  className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{t("day")} {index + 1}:</span>
                        {day.type === 'rest' ? (
                          <span className="text-blue-600 dark:text-blue-400">{t("restDay")}</span>
                        ) : (
                          <span className="text-green-600 dark:text-green-400">{t("workoutDay")}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => handleMoveDay(index, 'up')}
                          disabled={index === 0}
                        >
                          <FaArrowUp className={index === 0 ? "opacity-50" : ""} />
                        </button>

                        <button
                          type="button"
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => handleMoveDay(index, 'down')}
                          disabled={index === schedule.length - 1}
                        >
                          <FaArrowDown className={index === schedule.length - 1 ? "opacity-50" : ""} />
                        </button>

                        <button
                          type="button"
                          className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleRemoveDay(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>

                  {day.type === 'workout' && (
                    <div className="p-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("selectWorkout")}
                      </label>
                      <select
                        value={day.workout || ''}
                        onChange={(e) => handleSelectWorkout(index, e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2 bg-gray-50 shadow-sm transition-all
                                  focus:border-green-500 focus:ring-0 focus:shadow-md
                                  hover:border-green-300
                                  dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                  dark:focus:border-green-500 dark:hover:border-green-700"
                        required
                      >
                        <option value="">{t("selectWorkout")}</option>
                        {workouts.map(workout => (
                          <option key={workout._id} value={workout._id}>
                            {workout.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {t("noScheduleDays")}
              </p>
            </div>
          )}
        </div>

        <div className="mb-10 px-4 sm:px-10">
          <button
            className="
              mb-5
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              rounded-md
              bg-gradient-to-r
              from-green-400
              to-green-500
              py-4
              px-5
              text-center
              text-lg
              font-bold
              text-green-800
              shadow-md
              hover:shadow-lg
              transition-all
              hover:scale-[0.98]
              dark:text-white
            "
            type="submit"
          >
            {t("editProgram")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Program;

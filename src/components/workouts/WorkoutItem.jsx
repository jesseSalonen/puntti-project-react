// Modified WorkoutItem.jsx component
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaUser, FaClock, FaAngleDown, FaAngleUp, FaDumbbell } from 'react-icons/fa';
import CommonHelpers from '../../helpers/CommonHelpers';

const WorkoutItem = ({ workout, onDelete, startWorkoutSession }) => {
  const { t } = useTranslation(['workouts', 'common', 'exercises']);
  const [expandedExercises, setExpandedExercises] = useState({});

  const isStartWorkout = typeof startWorkoutSession === 'function';

  const toggleExerciseExpand = (exerciseId) => {
    setExpandedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5">
        <div className="mb-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {workout.name}
          </h2>
        </div>

        {workout.description && (
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            {workout.description}
          </p>
        )}

        <div className="flex flex-col">
          <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaClock className="mr-1" />
            <span>{t('createdAt', { ns: 'exercises' })}: {CommonHelpers.getDateTimeText(new Date(workout.createdAt))}</span>
          </div>
          {workout.user && (
            <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaUser className="mr-1" />
              <span>{t('createdBy', { ns: 'exercises' })}: {workout.user.name}</span>
            </div>
          )}
        </div>

        {workout.exercises && workout.exercises.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t('exercises', { ns: 'common' })}:
            </h3>
            <div className="space-y-3">
              {workout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Exercise Header */}
                  <div
                    className="p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleExerciseExpand(exercise._id)}
                  >
                    <div className="flex items-center">
                      <FaDumbbell className="text-green-500 mr-2" />
                      <h4 className="font-semibold">{exercise.exercise.name}</h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExerciseExpand(exercise._id);
                      }}
                      className="flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      type="button"
                    >
                      {expandedExercises[exercise._id] ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </button>
                  </div>

                  {/* Exercise Details (Expandable) */}
                  {expandedExercises[exercise._id] && (
                    <div className="p-3">
                      {exercise.exercise.muscles && exercise.exercise.muscles.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm font-medium">{t('muscles', { ns: 'exercises' })}: </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {exercise.exercise.muscles.map((muscle) => (
                              <span
                                key={muscle._id}
                                className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-100"
                              >
                                {muscle.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sets Section */}
                      <div className="mt-2">
                        <h5 className="font-medium text-sm mb-2">{t('sets', { ns: 'workouts' })}:</h5>

                        {exercise.sets && exercise.sets.length > 0 ? (
                          <div className="space-y-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div
                                key={setIndex}
                                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold text-sm dark:bg-green-900 dark:text-green-100 mr-2">
                                      {setIndex + 1}
                                    </span>
                                    <span className="font-medium text-sm">
                                      {t('setNumber', { number: setIndex + 1, ns: 'workouts' })}
                                    </span>
                                  </div>
                                  <div className="flex space-x-3 text-sm">
                                    <span className="bg-green-50 dark:bg-green-800/30 px-2 py-1 rounded">
                                      {set.reps || 0} {t('reps', { ns: 'workouts' })}
                                    </span>
                                  </div>
                                </div>

                                {/* Drop Set and Rest Pause indicators */}
                                {(set.dropSet || set.restPause) && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {set.dropSet && (
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs dark:bg-blue-900 dark:text-blue-100">
                                        {t('dropSet', { ns: 'workouts' })}
                                      </span>
                                    )}

                                    {set.restPause && (
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs dark:bg-purple-900 dark:text-purple-100">
                                        {t('restPause', { ns: 'workouts' })}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-md p-3 text-center dark:bg-gray-700">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noSets', { ns: 'workouts' })}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {isStartWorkout ? (
            <button
              onClick={() => startWorkoutSession(workout._id)}
              className="
                cursor-pointer
                rounded-md
                bg-gradient-to-r
                from-green-500
                to-green-100
                py-1
                px-5
                max-md:py-1
                max-md:px-2
                text-green-800
                max-w-xs
                whitespace-nowrap
                ml-1
              "
            >
              {t('start', { ns: 'common' })}
            </button>
          ) : (
            <>
              <Link to={`/workouts/${workout._id}`}>
                <button
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-md
                    py-2
                    px-4
                    text-center
                    transition-colors
                    duration-200
                    bg-white
                    text-gray-800
                    border
                    border-green-200
                    shadow-sm
                    hover:bg-green-50
                    hover:text-green-700
                    dark:border-none
                    dark:bg-[#2A3540]
                    dark:text-[#CFD7E5]
                    dark:hover:bg-[#3A4549]
                    dark:hover:text-green-400
                  "
                  aria-label={t('edit', { ns: 'common' })}
                >
                  <FaEdit className="mr-1" /> {t('edit', { ns: 'common' })}
                </button>
              </Link>
              <button
                onClick={() => onDelete(workout._id)}
                className="
                  flex
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-md
                  py-2
                  px-4
                  text-center
                  transition-colors
                  duration-200
                  bg-white
                  text-gray-800
                  border
                  border-red-200
                  shadow-sm
                  hover:bg-red-50
                  hover:text-red-700
                  dark:border-none
                  dark:bg-[#2A3540]
                  dark:text-[#CFD7E5]
                  dark:hover:bg-[#3A4549]
                  dark:hover:text-red-400
                "
                aria-label={t('delete', { ns: 'common' })}
              >
                <FaTrash className="mr-1" /> {t('delete', { ns: 'common' })}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutItem;
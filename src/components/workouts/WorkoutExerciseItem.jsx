import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaTrash, FaAngleDown, FaAngleUp, FaDumbbell } from 'react-icons/fa';
import SetItem from './SetItem';

const WorkoutExerciseItem = ({ exercise, onRemove, onAddSet, onRemoveSet, onUpdateSet }) => {
  const { t } = useTranslation(['exercises', 'workouts']);
  const [showSets, setShowSets] = useState(true);

  const handleAddSet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddSet(exercise._id);
  };

  const handleToggleSets = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSets(!showSets);
  };

  const handleRemoveExercise = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(exercise._id);
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="flex flex-col">
        {/* Exercise Header */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center">
              <FaDumbbell className="text-green-500 mr-2" />
              <h3 className="text-xl font-bold">{exercise.name}</h3>
            </div>
            <button
              onClick={handleRemoveExercise}
              className="
                flex
                items-center 
                justify-center 
                rounded-md
                py-1
                px-3
                text-center 
                transition-colors
                duration-200
                bg-white 
                text-red-600
                border 
                border-red-200
                shadow-sm
                hover:bg-red-50 
                hover:text-red-700
                dark:border-none
                dark:bg-[#2A3540]
                dark:text-red-400
                dark:hover:bg-[#3A4549]
                dark:hover:text-red-300
              "
              aria-label={t('workouts:removeExercise')}
              type="button"
            >
              <FaTrash className="mr-2" /> {t('workouts:removeExercise')}
            </button>
          </div>

          {exercise.muscles && exercise.muscles.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {exercise.muscles.map((muscle) => (
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
        </div>

        {/* Sets Section */}
        <div className="p-4">
          <div 
            className="flex justify-between items-center mb-3 cursor-pointer" 
            onClick={handleToggleSets}
          >
            <div className="flex items-center">
              <h4 className="font-semibold text-lg">{t('workouts:sets')}</h4>
              {exercise.sets?.length > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-100">
                  {exercise.sets.length}
                </span>
              )}
            </div>
            <button
              onClick={handleToggleSets}
              className="flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              type="button"
            >
              {showSets ? (
                <>
                  <FaAngleUp className="mr-1" /> {t('workouts:hideSets')}
                </>
              ) : (
                <>
                  <FaAngleDown className="mr-1" /> {t('workouts:showSets')}
                </>
              )}
            </button>
          </div>

          {showSets && (
            <div className="space-y-3 mt-4">
              {exercise.sets && exercise.sets.length > 0 ? (
                exercise.sets.map((set, index) => (
                  <SetItem
                    key={index}
                    set={set}
                    index={index}
                    exerciseId={exercise._id}
                    onRemove={onRemoveSet}
                    onUpdate={onUpdateSet}
                  />
                ))
              ) : (
                <div className="bg-gray-50 rounded-md p-4 text-center dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">{t('workouts:noSets')}</p>
                </div>
              )}
              
              <button
                onClick={handleAddSet}
                className="
                  flex
                  w-full
                  items-center 
                  justify-center 
                  rounded-md
                  bg-gradient-to-r
                  from-green-400
                  to-green-300
                  py-2
                  px-4
                  mt-4
                  text-center 
                  text-green-800
                  font-medium
                  hover:from-green-500
                  hover:to-green-400
                  dark:text-white
                "
                aria-label={t('workouts:addSet')}
                type="button"
              >
                <FaPlus className="mr-2" /> {t('workouts:addSet')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutExerciseItem;

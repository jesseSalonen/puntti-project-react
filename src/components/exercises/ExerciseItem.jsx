import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaPlus, FaTrash, FaUser, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonHelpers from '../../helpers/CommonHelpers';

const ExerciseItem = ({ exercise, onDelete, onAddToWorkout, allowModification }) => {
  const { t } = useTranslation('exercises');
  
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col">
        <h3 className="mb-2 text-xl font-bold">{exercise.name}</h3>
        <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FaClock className="mr-1" />
          <span>{t('createdAt')}: {CommonHelpers.getDateTimeText(new Date(exercise.createdAt))}</span>
        </div>
        {exercise.user && (
          <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaUser className="mr-1" /> 
            <span>{t('createdBy')}: {exercise.user.name}</span>
          </div>
        )}
        {exercise.muscles && exercise.muscles.length > 0 && (
          <div className="mb-3">
            <span className="text-sm font-medium">{t('muscles')}: </span>
            <div className="mt-1 flex flex-wrap gap-1">
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
        <div className="mt-2 flex flex-wrap gap-2">
          {allowModification ? (
            <button
              type="button"
              onClick={() => onAddToWorkout(exercise)}
              className="
                flex
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md
                bg-gradient-to-r
                from-green-500
                to-green-100
                py-2
                px-4
                text-center 
                text-green-800
                hover:from-green-600
                hover:to-green-200
                dark:hover:text-white
              "
              aria-label={t('addToWorkout')}
            >
              <FaPlus className="mr-1" /> {t('addToWorkout')}
            </button>
          ) : (
            <>
              <Link to={`/exercises/${exercise._id}`}>
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
                  aria-label={t('editExercise')}
                >
                  <FaEdit className="mr-1" /> {t('editExercise')}
                </button>
              </Link>
              <button
                onClick={() => onDelete(exercise._id)}
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
                aria-label={t('deleteExercise')}
              >
                <FaTrash className="mr-1" /> {t('deleteExercise')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;

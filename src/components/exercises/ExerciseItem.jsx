import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonHelpers from '../../helpers/CommonHelpers';

const ExerciseItem = ({ exercise, onDelete, showAddButton }) => {
  const { t } = useTranslation('exercises');
  
  const handleDelete = () => {
    if (window.confirm(t('confirmDeleteExercise'))) {
      onDelete(exercise._id);
    }
  };
  
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col">
        <h3 className="mb-2 text-xl font-bold">{exercise.name}</h3>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {t('createdAt')}: {CommonHelpers.getDateTimeText(new Date(exercise.createdAt))}
        </div>
        {exercise.muscles && exercise.muscles.length > 0 && (
          <div className="mb-3">
            <span className="text-sm font-medium">{t('muscles')}: </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {exercise.muscles.map((muscle) => (
                <span 
                  key={muscle._id} 
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                >
                  {muscle.name}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          <Link to={`/exercises/${exercise._id}`}>
            <button
              className="
                flex
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md
                bg-[#2A3540]
                py-2
                px-4
                text-center 
                text-white
                dark:text-[#CFD7E5]
                hover:bg-[#3A4549]
                hover:text-green-700
                dark:hover:text-green-400
              "
              aria-label={t('editExercise')}
            >
              <FaEdit className="mr-1" /> {t('editExercise')}
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="
              flex
              cursor-pointer 
              items-center 
              justify-center 
              rounded-md
              bg-[#2A3540]
              py-2
              px-4
              text-center 
              text-white
              dark:text-[#CFD7E5]
              hover:bg-[#3A4549]
              hover:text-red-600
              dark:hover:text-red-400
            "
            aria-label={t('deleteExercise')}
          >
            <FaTrash className="mr-1" /> {t('deleteExercise')}
          </button>
          {showAddButton && (
            <button
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;

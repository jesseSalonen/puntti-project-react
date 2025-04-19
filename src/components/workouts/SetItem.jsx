import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const SetItem = ({ set, index, exerciseId, onRemove, onUpdate }) => {
  const { t } = useTranslation('workouts');

  const handleRepsChange = (e) => {
    e.stopPropagation();
    const reps = parseInt(e.target.value) || 0;
    onUpdate(exerciseId, index, { ...set, reps });
  };

  const handleRepsIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newReps = (set.reps || 0) + 1;
    onUpdate(exerciseId, index, { ...set, reps: newReps });
  };

  const handleRepsDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newReps = Math.max((set.reps || 0) - 1, 0);
    onUpdate(exerciseId, index, { ...set, reps: newReps });
  };

  const handleDropSetChange = (e) => {
    e.stopPropagation();
    onUpdate(exerciseId, index, { ...set, dropSet: e.target.checked });
  };

  const handleRestPauseChange = (e) => {
    e.stopPropagation();
    onUpdate(exerciseId, index, { ...set, restPause: e.target.checked });
  };

  const handleRemoveSet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(exerciseId, index);
  };

  return (
    <div 
      className="bg-gray-50 rounded-md dark:bg-gray-700 p-3 shadow-sm transition-all hover:shadow-md" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold text-sm dark:bg-green-900 dark:text-green-100">
            {index + 1}
          </span>
          <div className="flex items-center ml-3">
            <label htmlFor={`set-${exerciseId}-${index}-reps`} className="mr-2 text-sm font-medium">
              {t('reps')}:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleRepsDecrement}
                className="flex h-7 w-7 items-center justify-center rounded-l-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
              >
                <FaMinus size={12} />
              </button>
              <input
                id={`set-${exerciseId}-${index}-reps`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="0"
                value={set.reps || 0}
                onChange={handleRepsChange}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-7 border-y border-gray-300 p-0 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleRepsIncrement}
                className="flex h-7 w-7 items-center justify-center rounded-r-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleRemoveSet}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-700 dark:bg-gray-600 dark:text-red-400 dark:hover:bg-gray-500"
          aria-label={t('removeSet')}
          type="button"
        >
          <FaTrash size={14} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-2 px-2">
        <div className="flex items-center min-w-[100px]">
          <input
            id={`set-${exerciseId}-${index}-dropset`}
            type="checkbox"
            checked={set.dropSet || false}
            onChange={handleDropSetChange}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor={`set-${exerciseId}-${index}-dropset`} className="ml-2 text-sm">
            {t('dropSet')}
          </label>
        </div>
        
        <div className="flex items-center min-w-[100px]">
          <input
            id={`set-${exerciseId}-${index}-restpause`}
            type="checkbox"
            checked={set.restPause || false}
            onChange={handleRestPauseChange}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor={`set-${exerciseId}-${index}-restpause`} className="ml-2 text-sm">
            {t('restPause')}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SetItem;

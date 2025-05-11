import React from 'react';
import {FaMinus, FaPlus} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';

const SessionSetItem = ({set, setIndex, exerciseIndex, exercisePerformances, setExercisePerformances}) => {
  const { t } = useTranslation(['workoutSessions', 'common', 'dashboard', 'workouts']);

  const updateExercisePerformances = (value, name) => {
    const updatedPerformances = exercisePerformances.map(exercisePerformance => {

      return exercisePerformance;
    });
    updatedPerformances[exerciseIndex].sets[setIndex][name] = value;
    setExercisePerformances(updatedPerformances);
  };

  const handleRepsIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateExercisePerformances((set.reps || 0) + 1, 'reps');
  };

  const handleRepsDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateExercisePerformances(Math.max((set.reps || 0) - 1, 0), 'reps');
  };

  const handleRepsChange = (e) => {
    e.stopPropagation();
    updateExercisePerformances(parseInt(e.target.value) || 0, 'reps');
  };

  const handleWeightDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateExercisePerformances(Math.max((set.weight || 0) - 1, 0), 'weight');
  };

  const handleWeightChange = (e) => {
    e.stopPropagation();
    updateExercisePerformances(e.target.value, 'weight');
  };

  const handleWeightIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateExercisePerformances((set.weight || 0) + 1, 'weight')
  };

  const handleNotesChange = (e) => {
    e.stopPropagation();
    updateExercisePerformances(e.target.value, 'notes');
  }

  return (
    <div
      className={`
        bg-gray-50 dark:bg-gray-700 rounded-md p-3 shadow-sm border
        ${set.completed ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-600'}
      `}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold text-sm dark:bg-green-900 dark:text-green-100 mr-2">
            {setIndex + 1}
          </span>
          <span className="font-medium">{t('setNumber', {number: setIndex + 1, ns: 'workouts'})}</span>

          <div className="flex ml-2">
            {set.dropSet && (
              <span
                className="ml-1 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                {t('dropSet', {ns: 'workouts'})}
              </span>
            )}
            {set.restPause && (
              <span
                className="ml-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {t('restPause', {ns: 'workouts'})}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Weight input */}
        <div className="flex flex-col">
          <label
            htmlFor={`set-${setIndex}-weight`}
            className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            {t('weight', {ns: 'workouts'})}
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleWeightDecrement}
              className="flex h-7 w-7 items-center justify-center rounded-l-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
            >
              <FaMinus size={12}/>
            </button>
            <input
              id={`set-${setIndex}-weight`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              value={set.weight || 0}
              onChange={handleWeightChange}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-7 border-y border-gray-300 p-0 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleWeightIncrement}
              className="flex h-7 w-7 items-center justify-center rounded-r-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
            >
              <FaPlus size={12}/>
            </button>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">kg</span>
          </div>
        </div>

        {/* Reps input */}
        <div className="flex flex-col">
          <label
            htmlFor={`set-${setIndex}-reps`}
            className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            {t('reps', {ns: 'workouts'})}
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleRepsDecrement}
              className="flex h-7 w-7 items-center justify-center rounded-l-md bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
            >
              <FaMinus size={12}/>
            </button>
            <input
              id={`set-${setIndex}-reps`}
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
              <FaPlus size={12}/>
            </button>
          </div>
        </div>
      </div>

      {/* Notes input */}
      <div className="mt-3">
        <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t('notes')}
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 shadow-sm transition-all focus:border-green-500 focus:ring-0 focus:shadow-md"
          value={set.notes || ''}
          onChange={handleNotesChange}
          placeholder={t('howDidTheSetGo')}
        />
      </div>
    </div>
  );
};

export default SessionSetItem;
import React from 'react';
import {FaMinus, FaPlus} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';

const SessionSetItem = ({set, setIndex, exerciseIndex, exercisePerformances, setExercisePerformances}) => {
  const { t } = useTranslation(['workoutSessions', 'common', 'dashboard', 'workouts']);

  const updateExercisePerformances = (value, name) => {
    // Create a deep copy of the exercise performances to avoid read-only errors
    const updatedPerformances = exercisePerformances.map((performance, perfIndex) => {
      if (perfIndex === exerciseIndex) {
        // Create a copy of this exercise performance
        const updatedSets = performance.sets.map((s, i) => {
          if (i === setIndex) {
            // Create a new set object with the updated property
            return { ...s, [name]: value };
          }
          return { ...s };
        });

        return { ...performance, sets: updatedSets };
      }
      // For other performances, create a deep copy
      return {
        ...performance,
        sets: performance.sets.map(s => ({ ...s }))
      };
    });

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

    // Don't do anything if weight is empty
    if (set.weight === '' || set.weight === undefined || set.weight === null) {
      return;
    }

    // Get current weight as float and handle potential string values with decimal points
    let currentWeight = typeof set.weight === 'string' ? parseFloat(set.weight) : (set.weight || 0);
    if (isNaN(currentWeight)) currentWeight = 0;

    // Decrease by 0.25 kg and ensure it's not negative
    let newWeight = Math.max(currentWeight - 0.25, 0);

    // Format to 2 decimal places
    newWeight = parseFloat(newWeight.toFixed(2));

    updateExercisePerformances(newWeight, 'weight');
  };

  const handleWeightChange = (e) => {
    e.stopPropagation();

    // Get the input value
    let inputValue = e.target.value;

    // Handle empty input
    if (inputValue === '') {
      updateExercisePerformances('', 'weight');
      return;
    }

    // Replace comma with dot for decimal input
    inputValue = inputValue.replace(',', '.');

    // Handle decimal point typing
    if (inputValue === '.' || inputValue === '0.') {
      updateExercisePerformances(inputValue, 'weight');
      return;
    }

    // Restrict to maximum of two decimal places
    if (inputValue.includes('.')) {
      const parts = inputValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        // Truncate to two decimal places
        inputValue = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }
    }

    // Convert to number and validate
    let numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
      updateExercisePerformances('', 'weight');
      return;
    }

    // Ensure non-negative values
    numValue = Math.max(numValue, 0);

    // Format to ensure consistent decimal precision but keep exact input during typing
    if (inputValue.includes('.')) {
      // Keep original input for decimal values to allow continued typing
      updateExercisePerformances(inputValue, 'weight');
    } else {
      // For whole numbers, use the parsed value
      updateExercisePerformances(numValue, 'weight');
    }
  };

  const handleWeightIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Set to 0.25 if weight is empty
    if (set.weight === '' || set.weight === undefined || set.weight === null) {
      updateExercisePerformances(0.25, 'weight');
      return;
    }

    // Get current weight as float and handle potential string values with decimal points
    let currentWeight = typeof set.weight === 'string' ? parseFloat(set.weight) : (set.weight || 0);
    if (isNaN(currentWeight)) currentWeight = 0;

    // Increase by 0.25 kg
    let newWeight = currentWeight + 0.25;

    // Format to 2 decimal places
    newWeight = parseFloat(newWeight.toFixed(2));

    updateExercisePerformances(newWeight, 'weight');
  };

  const handleNotesChange = (e) => {
    e.stopPropagation();
    updateExercisePerformances(e.target.value, 'notes');
  }

  return (
    <div
      className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 shadow-sm border border-gray-200 dark:border-gray-600"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full font-semibold text-sm mr-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
          >
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
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]{0,2}"
              min="0"
              step="0.25"
              value={set.weight === undefined || set.weight === null ? '' : set.weight}
              onChange={handleWeightChange}
              onClick={(e) => e.stopPropagation()}
              className="w-14 h-7 border-y border-gray-300 p-0 text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none"
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
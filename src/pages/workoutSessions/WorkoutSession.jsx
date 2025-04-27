import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaCheck, FaClipboardList, FaSave, FaTimes, FaDumbbell } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import {
  getWorkoutSession,
  updateWorkoutSession,
  selectWorkoutSessions
} from '../../features/workoutSessions/workoutSessionSlice';
import Spinner from '../../components/common/Spinner';

const WorkoutSession = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(['workoutSessions', 'common']);

  const { currentWorkoutSession, isLoading, isError, isSuccess, message } = useSelector(selectWorkoutSessions);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercisePerformances, setExercisePerformances] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch workout session
  useEffect(() => {
    dispatch(getWorkoutSession(id));
  }, [dispatch, id]);

  // Handle error
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  // Setup workout session data
  useEffect(() => {
    if (currentWorkoutSession) {
      setExercisePerformances(currentWorkoutSession.exercisePerformances);
      setNotes(currentWorkoutSession.notes || '');
    }
  }, [currentWorkoutSession]);

  // Handle success updates
  useEffect(() => {
    if (isSuccess && isSaving) {
      toast.success(t('workoutSessionUpdated'));
      setIsSaving(false);
    }
  }, [isSuccess, isSaving, t]);

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedPerformances = [...exercisePerformances];
    updatedPerformances[exerciseIndex].sets[setIndex][field] = field === 'completed' ? !updatedPerformances[exerciseIndex].sets[setIndex][field] : value;
    setExercisePerformances(updatedPerformances);
  };

  const handleSetNotes = (exerciseIndex, setIndex, notes) => {
    const updatedPerformances = [...exercisePerformances];
    updatedPerformances[exerciseIndex].sets[setIndex].notes = notes;
    setExercisePerformances(updatedPerformances);
  };

  const handleSave = () => {
    if (!currentWorkoutSession) return;

    const workoutSessionData = {
      exercisePerformances,
      notes
    };

    setIsSaving(true);
    dispatch(updateWorkoutSession({ id, workoutSessionData }));
  };

  const handleCompleteWorkout = () => {
    if (!currentWorkoutSession) return;

    const allSetsCompleted = exercisePerformances.every(exercise =>
      exercise.sets.every(set => set.completed)
    );

    if (!allSetsCompleted) {
      const confirm = window.confirm(t('notAllSetsCompletedConfirm'));
      if (!confirm) return;
    }

    const workoutSessionData = {
      exercisePerformances,
      notes,
      status: 'completed',
      completedAt: new Date().toISOString()
    };

    setIsSaving(true);
    dispatch(updateWorkoutSession({ id, workoutSessionData }));
    navigate('/');
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < exercisePerformances.length - 1) {
      handleSave();
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      handleSave();
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  if (isLoading || !currentWorkoutSession) {
    return <Spinner />;
  }

  const currentExercise = exercisePerformances[currentExerciseIndex];
  const isFirstExercise = currentExerciseIndex === 0;
  const isLastExercise = currentExerciseIndex === exercisePerformances.length - 1;
  const workoutName = currentWorkoutSession.workout?.name || '';
  const exerciseCount = exercisePerformances.length;

  return (
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-3/4 pb-20">
      {/* Header with green gradient */}
      <div className="mb-4 md:mb-6 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-5 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <FaDumbbell className="text-green-500 mr-2 text-xl" />
            <h1 className="text-2xl md:text-3xl font-bold">{workoutName}</h1>
          </div>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
            <span>
              {t('exercise')} {currentExerciseIndex + 1}/{exerciseCount}
            </span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-300"></div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mb-4 sticky top-2 z-10">
        <button
          className={`
            flex items-center justify-center rounded-md px-4 py-3 md:py-2 shadow-sm transition-all hover:scale-[0.98]
            ${isFirstExercise
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
          }
          `}
          onClick={goToPreviousExercise}
          disabled={isFirstExercise}
        >
          <FaArrowLeft className="mr-2" /> {t('previous')}
        </button>

        <button
          className={`
            flex items-center justify-center rounded-md px-4 py-3 md:py-2 shadow-sm transition-all hover:scale-[0.98]
            ${isLastExercise
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
          }
          `}
          onClick={goToNextExercise}
          disabled={isLastExercise}
        >
          {t('next')} <FaArrowRight className="ml-2" />
        </button>
      </div>

      {currentExercise && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          {/* Exercise header */}
          <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
            <div className="flex items-center">
              <FaDumbbell className="text-green-500 mr-2" />
              <h2 className="text-xl font-bold">{currentExercise.exercise.name}</h2>
            </div>
            {currentExercise.exercise.description && (
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {currentExercise.exercise.description}
              </p>
            )}
          </div>

          <div className="p-4">
            {/* Target muscles section */}
            <div className="mb-4">
              <h3 className="mb-2 font-semibold flex items-center">
                <BsBarChartFill className="mr-2 text-green-500" /> {t('targetMuscles')}:
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentExercise.exercise.muscles.map((muscle) => (
                  <span
                    key={muscle._id}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {muscle.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Sets section */}
            <div className="mb-4">
              <h3 className="mb-2 font-semibold flex items-center">
                <FaClipboardList className="mr-2 text-green-500" /> {t('sets')}:
              </h3>

              <div className="space-y-3">
                {currentExercise.sets.map((set, setIndex) => {
                  const isDropSet = set.dropSet;
                  const isRestPause = set.restPause;

                  return (
                    <div
                      key={setIndex}
                      className={`
                        bg-gray-50 dark:bg-gray-700 rounded-md p-3 shadow-sm border
                        ${set.completed ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-600'}
                      `}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold text-sm dark:bg-green-900 dark:text-green-100 mr-2">
                            {setIndex + 1}
                          </span>
                          <span className="font-medium">{t('setNumber', { number: setIndex + 1 })}</span>

                          <div className="flex ml-2">
                            {isDropSet && (
                              <span className="ml-1 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                {t('dropSet')}
                              </span>
                            )}
                            {isRestPause && (
                              <span className="ml-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {t('restPause')}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleSetChange(currentExerciseIndex, setIndex, 'completed', !set.completed)}
                          className={`
                            rounded-full p-3 transition-colors hover:scale-105 shadow-sm
                            ${set.completed
                            ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-400'
                          }
                          `}
                          aria-label={set.completed ? t('markIncomplete') : t('markComplete')}
                        >
                          {set.completed ? <FaCheck /> : <FaTimes />}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Weight input */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            {t('weight')}
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 shadow-sm transition-all focus:border-green-500 focus:ring-0 focus:shadow-md"
                              value={set.weight || 0}
                              onChange={(e) => handleSetChange(currentExerciseIndex, setIndex, 'weight', parseFloat(e.target.value))}
                              min="0"
                              step="2.5"
                            />
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">kg</span>
                          </div>
                        </div>

                        {/* Reps input */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            {t('reps')}
                          </label>
                          <input
                            type="number"
                            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 shadow-sm transition-all focus:border-green-500 focus:ring-0 focus:shadow-md"
                            value={set.reps}
                            onChange={(e) => handleSetChange(currentExerciseIndex, setIndex, 'reps', parseInt(e.target.value))}
                            min="0"
                          />
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
                          onChange={(e) => handleSetNotes(currentExerciseIndex, setIndex, e.target.value)}
                          placeholder={t('optionalNotes')}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workout notes */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold flex items-center">
            <FaClipboardList className="mr-2 text-green-500" /> {t('workoutNotes')}
          </h3>
        </div>
        <div className="p-4">
          <textarea
            id="workout-notes"
            className="w-full rounded-md border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 shadow-sm transition-all focus:border-green-500 focus:ring-0 focus:shadow-md"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('enterWorkoutNotes')}
          ></textarea>
        </div>
      </div>

      {/* Fixed bottom action buttons on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 flex gap-3 md:static md:bg-transparent md:border-0 md:p-0 md:mb-10 z-20">
        <button
          className="
            flex-1
            flex
            items-center
            justify-center
            rounded-md
            bg-blue-100
            py-3
            px-5
            font-bold
            text-blue-700
            shadow-md
            hover:shadow-lg
            hover:bg-blue-200
            transition-all
            hover:scale-[0.98]
            dark:bg-blue-900
            dark:text-blue-300
          "
          onClick={handleSave}
          disabled={isSaving}
        >
          <FaSave className="mr-2" /> {t('saveProgress')}
        </button>

        <button
          className="
            flex-1
            flex
            items-center
            justify-center
            rounded-md
            bg-green-100
            py-3
            px-5
            font-bold
            text-green-700
            shadow-md
            hover:shadow-lg
            hover:bg-green-200
            transition-all
            hover:scale-[0.98]
            dark:bg-green-900
            dark:text-green-300
          "
          onClick={handleCompleteWorkout}
          disabled={isSaving}
        >
          <FaCheck className="mr-2" /> {t('completeWorkout')}
        </button>
      </div>
    </div>
  );
};

export default WorkoutSession;
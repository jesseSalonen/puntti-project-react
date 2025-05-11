import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaClipboardList,
  FaSave,
  FaDumbbell,
} from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import {
  getWorkoutSession,
  updateWorkoutSession,
  selectWorkoutSessions, reset
} from '../../features/workoutSessions/workoutSessionSlice';
import Spinner from '../../components/common/Spinner';
import SessionSetItem from '../../components/workoutSessions/SessionSetItem.jsx';

const WorkoutSession = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercisePerformances, setExercisePerformances] = useState([]);
  const [notes, setNotes] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(['workoutSessions', 'common', 'dashboard', 'workouts']);

  const { currentWorkoutSession, isLoading, isError, message } = useSelector(selectWorkoutSessions);

  // Fetch workout session
  useEffect(() => {
    dispatch(getWorkoutSession(id));

    return () => {
      dispatch(reset());
    }
  }, [dispatch]);

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

  const handleSave = () => {
    if (!currentWorkoutSession) return;

    const workoutSessionData = {
      exercisePerformances,
      notes
    };

    dispatch(updateWorkoutSession({ id, workoutSessionData }));
  };

  const handlePauseWorkout = () => {
    if (!currentWorkoutSession) return;

    const workoutSessionData = {
      exercisePerformances,
      notes,
      status: 'paused'
    };

    dispatch(updateWorkoutSession({ id, workoutSessionData }));
    navigate('/');
  };

  const handleCompleteWorkout = () => {
    if (!currentWorkoutSession) return;

    // Create a deep copy of exercisePerformances without modifying set completion status
    const updatedExercisePerformances = exercisePerformances.map(exercisePerformance => {
      return {
        ...exercisePerformance,
        sets: exercisePerformance.sets.map(set => ({
          ...set
        }))
      };
    });

    const workoutSessionData = {
      exercisePerformances: updatedExercisePerformances,
      notes,
      status: 'completed',
      completedAt: new Date().toISOString()
    };

    dispatch(updateWorkoutSession({ id, workoutSessionData }));
    toast.success(t('workoutCompletedSuccessfully', { defaultValue: 'Workout completed successfully!' }));
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
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-3/4">
      <div className="flex gap-3 p-0 mb-6 z-20">
        <button
          className="
            flex-1
            flex
            items-center
            justify-center
            rounded-md
            py-3
            px-5
            font-bold
            text-green-700
            shadow-md
            hover:shadow-lg
            transition-all
            hover:scale-[0.98]
            dark:text-green-300
            border
            border-green-500
          "
          onClick={handlePauseWorkout}
        >
          <FaSave className="mr-2" /> {t('pauseWorkout')}
        </button>

        <button
          className="
            flex-1
            flex
            items-center
            justify-center
            rounded-md
            bg-gradient-to-r
            from-green-500
            to-green-100
            py-3
            px-5
            font-bold
            text-green-800
            shadow-md
            hover:shadow-lg
            transition-all
            hover:scale-[0.98]
          "
          onClick={handleCompleteWorkout}
        >
          <FaCheck className="mr-2" /> {t('endWorkout')}
        </button>
      </div>
      {/* Header with green gradient */}
      <div className="mb-4 md:mb-6 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-5 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <FaDumbbell className="text-green-500 mr-2 text-xl" />
            <h1 className="text-2xl md:text-3xl font-bold">{workoutName}</h1>
          </div>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
            <span>
              {t('exercise', {ns: 'common'})} {currentExerciseIndex + 1}/{exerciseCount}
            </span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-300"></div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mb-4 sticky top-2 z-10">
        <button
          className={`
            flex items-center justify-center rounded-md px-4 py-3 md:py-2 shadow-sm transition-all
            ${isFirstExercise
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800'
          }
          `}
          onClick={goToPreviousExercise}
          disabled={isFirstExercise}
        >
          <FaArrowLeft className="mr-2" /> {t('previous', {ns: 'common'})}
        </button>

        <button
          className={`
            flex items-center justify-center rounded-md px-4 py-3 md:py-2 shadow-sm transition-all
            ${isLastExercise
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800'
          }
          `}
          onClick={goToNextExercise}
          disabled={isLastExercise}
        >
          {t('next', {ns: 'common'})} <FaArrowRight className="ml-2" />
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
                <BsBarChartFill className="mr-2 text-green-500" /> {t('exerciseMuscles', {ns: 'dashboard'})}:
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
                <FaClipboardList className="mr-2 text-green-500" /> {t('sets', {ns: 'workouts'})}:
              </h3>

              <div className="space-y-3">
                {currentExercise.sets.map((set, setIndex) => (
                  <SessionSetItem
                    key={setIndex}
                    set={set}
                    setIndex={setIndex}
                    exerciseIndex={currentExerciseIndex}
                    exercisePerformances={exercisePerformances}
                    setExercisePerformances={setExercisePerformances}
                  />
                ))}
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
            placeholder={t('howDidTheExerciseGo')}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
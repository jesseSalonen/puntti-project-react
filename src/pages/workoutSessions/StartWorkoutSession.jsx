import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import RecentSessions from '../../components/workoutSessions/RecentSessions.jsx';
import ProgramList from '../../components/programs/ProgramList.jsx';
import WorkoutList from '../../components/workouts/WorkoutList.jsx';
import {RiArrowGoBackFill} from 'react-icons/ri';
import {createWorkoutSession, selectWorkoutSessions} from '../../features/workoutSessions/workoutSessionSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const StartWorkoutSession = () => {
  const [workoutSearchOpen, setWorkoutSearchOpen] = useState(false);
  const [activeView, setActiveView] = useState('programs'); // 'programs' or 'workouts'

  const { t } = useTranslation(["workoutSessions", "workouts", "common"]);
  const { workoutSessions, isLoading, isError, isSuccess, message } = useSelector(selectWorkoutSessions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startWorkoutSessionFromProgram = (programId, workoutId, index) => {
    dispatch(createWorkoutSession({workoutId, programId, programDay: index}));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/workout-sessions/${workoutSessions[workoutSessions.length - 1]?._id}`);
    }
  }, [isSuccess]);

  const startWorkoutSessionFromWorkout = (workoutId) => {
    dispatch(createWorkoutSession({workoutId}));
  };

  const toggleView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-3/4">
      <div className="mb-6 flex flex-col items-center py-0 font-bold md:mb-12">
        <h1 className="mb-4 text-4xl md:text-5xl">{t("startWorkout", {ns: "common"})}</h1>
      </div>
      {workoutSearchOpen ? (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
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
                py-3
                px-5
                max-md:py-2
                max-md:px-3
                text-green-800
                whitespace-nowrap
              "
              type="button"
              onClick={() => setWorkoutSearchOpen(false)}
            >
              <RiArrowGoBackFill className="mr-2" />
              {t("back", {ns: "common"})}
            </button>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1 shadow-sm">
              <button
                onClick={() => toggleView('programs')}
                className={`rounded-full py-2 px-4 text-center transition-all duration-200 ${
                  activeView === 'programs'
                    ? 'bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400'
                }`}
              >
                {t('programs', {ns: 'common'})}
              </button>
              <button
                onClick={() => toggleView('workouts')}
                className={`rounded-full py-2 px-4 text-center transition-all duration-200 ${
                  activeView === 'workouts'
                    ? 'bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400'
                }`}
              >
                {t('workouts', {ns: 'common'})}
              </button>
            </div>
          </div>

          {activeView === 'programs' ? (
            <ProgramList startWorkoutSession={startWorkoutSessionFromProgram} />
          ) : (
            <WorkoutList startWorkoutSession={startWorkoutSessionFromWorkout} />
          )}
        </>
      ) : (
        <>
          <RecentSessions />

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('orTrySomethingNew')}</h2>

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
            type="button"
            onClick={() => setWorkoutSearchOpen(true)}
          >
            {t("searchOtherWorkoutsAndPrograms")}
          </button>
        </>
      )}
    </div>
  );
};

export default StartWorkoutSession;

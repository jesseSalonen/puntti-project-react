import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {selectUserName} from '../features/auth/authSlice';
import RecentSessions from '../components/workoutSessions/RecentSessions.jsx';
import {getWorkoutSessions, reset, selectWorkoutSessions} from '../features/workoutSessions/workoutSessionSlice.js';
import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import Spinner from '../components/common/Spinner.jsx';

function Dashboard() {
  const {t} = useTranslation(['workoutSessions', 'workouts', 'common', 'dashboard']);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const { workoutSessions, isLoading, isError, message } = useSelector(selectWorkoutSessions);

  useEffect(() => {
    dispatch(getWorkoutSessions());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="mb-12 py-0 px-5 font-bold">
      <h1 className="mb-4 text-5xl max-sm:text-4xl">
        {t('welcome', {ns: 'dashboard', name: userName})}
      </h1>
      <p className="text-4xl text-gray-400 max-sm:text-2xl">
        {t('isWorkoutDone', {ns: 'dashboard'})}
      </p>
      <RecentSessions workoutSessions={workoutSessions} />
    </section>
  );
}

export default Dashboard;

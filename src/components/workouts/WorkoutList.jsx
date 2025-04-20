import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getWorkouts, reset, selectWorkouts} from '../../features/workouts/workoutSlice.js';
import {toast} from 'react-toastify';
import Spinner from '../common/Spinner.jsx';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const { workouts, isLoading, isError, message } = useSelector(selectWorkouts);

  useEffect(() => {
    dispatch(getWorkouts());

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
    <div>

    </div>
  );
};

export default WorkoutList;
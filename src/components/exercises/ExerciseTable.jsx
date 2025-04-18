import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  deleteExercise,
  reset,
  selectExercises,
} from "../../features/exercises/exerciseSlice";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import ExerciseItem from './ExerciseItem.jsx';

const ExerciseTable = () => {
  const { t } = useTranslation('exercises');
  const dispatch = useDispatch();
  const location = useLocation();

  const { exercises, isLoading, isError, message } =
    useSelector(selectExercises);
    
  const isAddWorkoutPage = location.pathname.includes('/workouts/add');

  useEffect(() => {
    dispatch(getExercises());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleDeleteExercise = (id) => {
    dispatch(deleteExercise(id))
      .unwrap()
      .then(() => {
        toast.success(t('exerciseDeletedSuccessfully'));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      {exercises.length === 0 ? (
        <p className="text-center text-lg">{t('noExercisesFound')}</p>
      ) : (
        exercises.map((exercise) => (
          <ExerciseItem 
            key={exercise._id} 
            exercise={exercise} 
            onDelete={handleDeleteExercise}
            showAddButton={isAddWorkoutPage}
          />
        ))
      )}
    </div>
  );
};

export default ExerciseTable;

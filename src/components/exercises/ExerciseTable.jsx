import React, { useEffect, useState } from 'react';
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
import Modal from '../Modal';

const ExerciseTable = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  
  const { t } = useTranslation('exercises');
  const dispatch = useDispatch();
  const location = useLocation();

  const { exercises, isLoading, isError, isSuccess, message } =
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

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('exerciseDeletedSuccessfully'));
      setDeleteModalOpen(false);
    }
  }, [isSuccess, t]);

  const handleDeleteExercise = (id) => {
    setExerciseToDelete(id);
    setDeleteModalOpen(true);
  };
  
  const confirmDeleteExercise = () => {
    if (exerciseToDelete) {
      dispatch(deleteExercise(exerciseToDelete));
    }
  };
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setExerciseToDelete(null);
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
      
      <Modal
        isOpen={deleteModalOpen}
        closeModal={closeDeleteModal}
        title={t('deleteExercise')}
      >
        <div className="p-4">
          <p className="mb-4 text-gray-800 dark:text-gray-200">{t('confirmDeleteExercise')}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={closeDeleteModal}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {t('cancel')}
            </button>
            <button
              onClick={confirmDeleteExercise}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              {t('deleteExercise')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExerciseTable;

import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  deleteExercise,
  reset,
  selectExercises,
} from "../../features/exercises/exerciseSlice";
import {
  getMuscles,
  selectMuscles,
} from "../../features/muscles/muscleSlice";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import ExerciseItem from './ExerciseItem.jsx';
import Modal from '../Modal';
import { FaSearch } from 'react-icons/fa';

const ExerciseTable = ({ onAddExercise }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('');
  
  const { t } = useTranslation('exercises');
  const dispatch = useDispatch();
  const location = useLocation();

  const { exercises, isLoading, isError, isSuccess, message } =
    useSelector(selectExercises);
  const { muscles, isLoading: musclesLoading, isError: musclesIsError, message: musclesMessage } = useSelector(selectMuscles);
    
  const isAddWorkoutPage = location.pathname.includes('/workouts/add');

  useEffect(() => {
    dispatch(getExercises());

    dispatch(getMuscles());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (musclesIsError) {
      toast.error(musclesMessage);
    }
  }, [isError, message, musclesIsError, musclesMessage]);

  useEffect(() => {
    if (isSuccess && exerciseToDelete) {
      toast.success(t('exerciseDeletedSuccessfully'));
      closeDeleteModal();
    }
  }, [isSuccess, exerciseToDelete, t]);

  const handleDeleteExercise = (id) => {
    if (!isAddWorkoutPage) {
      setExerciseToDelete(id);
      setDeleteModalOpen(true);
    }
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMuscleFilterChange = (e) => {
    setMuscleFilter(e.target.value);
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      // Filter by name
      const nameMatch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by muscle
      const muscleMatch = muscleFilter === '' || 
        (exercise.muscles && exercise.muscles.some(muscle => muscle._id === muscleFilter));
      
      return nameMatch && muscleMatch;
    });
  }, [exercises, searchQuery, muscleFilter]);

  if (isLoading || musclesLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-semibold">{t('filterExercises')}</h3>
        
        {/* Search by name */}
        <div className="mb-4">
          <label htmlFor="searchQuery" className="mb-1 block text-sm font-medium">
            {t('searchByName')}
          </label>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-green-500 dark:text-green-400" />
            </div>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t('searchExercises')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-gray-900 shadow-sm transition-all 
                        focus:border-green-500 focus:ring-0 focus:shadow-md
                        group-hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                        dark:focus:border-green-500 dark:group-hover:border-green-700"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-transparent group-hover:border-green-300 dark:group-hover:border-green-700"></div>
          </div>
        </div>
        
        {/* Filter by muscle */}
        <div>
          <label htmlFor="muscleFilter" className="mb-1 block text-sm font-medium">
            {t('filterByMuscle')}
          </label>
          <select
            id="muscleFilter"
            value={muscleFilter}
            onChange={handleMuscleFilterChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm transition-all 
                        focus:border-green-500 focus:ring-0 focus:shadow-md 
                        hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                        dark:focus:border-green-500 dark:hover:border-green-700"
          >
            <option value="">{t('allMuscles')}</option>
            {muscles.map((muscle) => (
              <option key={muscle._id} value={muscle._id}>
                {muscle.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredExercises.length === 0 ? (
        <p className="text-center text-lg">{t('noExercisesFound')}</p>
      ) : (
        filteredExercises.map((exercise) => (
          <ExerciseItem 
            key={exercise._id} 
            exercise={exercise} 
            onDelete={handleDeleteExercise}
            onAddToWorkout={onAddExercise}
            allowModification={isAddWorkoutPage}
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

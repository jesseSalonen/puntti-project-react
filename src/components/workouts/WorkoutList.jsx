// Modified WorkoutList.jsx component
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkouts, deleteWorkout, reset, selectWorkouts } from '../../features/workouts/workoutSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Spinner from '../common/Spinner.jsx';
import WorkoutItem from './WorkoutItem.jsx';
import Modal from '../Modal';
import { FaSearch } from 'react-icons/fa';

const WorkoutList = ({ startWorkoutSession }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation(['workouts', 'common']);
  const dispatch = useDispatch();
  const { workouts, isLoading, isError, isSuccess, message } = useSelector(selectWorkouts);

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

  useEffect(() => {
    if (isSuccess && workoutToDelete) {
      toast.success(t('workoutDeletedSuccessfully'));
      closeDeleteModal();
    }
  }, [isSuccess, workoutToDelete, t]);

  const handleDeleteWorkout = (id) => {
    setWorkoutToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteWorkout = () => {
    if (workoutToDelete) {
      dispatch(deleteWorkout(workoutToDelete));
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setWorkoutToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      return workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [workouts, searchQuery]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-semibold">{t('filterWorkouts')}</h3>

        {/* Search by name */}
        <div className="mb-4">
          <label htmlFor="searchQuery" className="mb-1 block text-sm font-medium">
            {t('searchByName', { ns: 'common' })}
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
              placeholder={t('searchWorkouts')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-gray-900 shadow-sm transition-all
                        focus:border-green-500 focus:ring-0 focus:shadow-md
                        group-hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                        dark:focus:border-green-500 dark:group-hover:border-green-700"
            />
          </div>
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <p className="text-center text-lg">{t('noWorkoutsFound')}</p>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <WorkoutItem
              key={workout._id}
              workout={workout}
              onDelete={handleDeleteWorkout}
              startWorkoutSession={startWorkoutSession}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={deleteModalOpen}
        closeModal={closeDeleteModal}
        title={t('deleteWorkout')}
      >
        <div className="p-4">
          <p className="mb-4 text-gray-800 dark:text-gray-200">{t('confirmDeleteWorkout')}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={closeDeleteModal}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {t('cancel', { ns: 'common' })}
            </button>
            <button
              onClick={confirmDeleteWorkout}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              {t('delete', { ns: 'common' })}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkoutList;
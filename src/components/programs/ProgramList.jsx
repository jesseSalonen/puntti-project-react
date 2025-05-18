import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrograms, deleteProgram, reset, selectPrograms } from '../../features/programs/programSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Spinner from '../common/Spinner.jsx';
import ProgramItem from './ProgramItem.jsx';
import Modal from '../Modal';
import { FaSearch } from 'react-icons/fa';

const ProgramList = ({startWorkoutSession}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { t } = useTranslation(['programs', 'common']);
  const dispatch = useDispatch();
  const { programs, isLoading, isError, isSuccess, message } = useSelector(selectPrograms);

  useEffect(() => {
    dispatch(getPrograms());

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
    if (isSuccess && programToDelete) {
      toast.success(t('programDeletedSuccessfully'));
      closeDeleteModal();
    }
  }, [isSuccess, programToDelete, t]);

  const handleDeleteProgram = (id) => {
    setProgramToDelete(id);
    setDeleteModalOpen(true);
  };
  
  const confirmDeleteProgram = () => {
    if (programToDelete) {
      dispatch(deleteProgram(programToDelete));
    }
  };
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setProgramToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      return program.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [programs, searchQuery]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-semibold">{t('filterPrograms')}</h3>
        
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
              placeholder={t('searchPrograms')}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-gray-900 shadow-sm transition-all 
                        focus:border-green-500 focus:ring-0 focus:shadow-md
                        group-hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                        dark:focus:border-green-500 dark:group-hover:border-green-700"
            />
          </div>
        </div>
      </div>

      {filteredPrograms.length === 0 ? (
        <p className="text-center text-lg">{t('noProgramsFound')}</p>
      ) : (
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <ProgramItem 
              key={program._id} 
              program={program} 
              onDelete={handleDeleteProgram}
              startWorkoutSession={startWorkoutSession}
            />
          ))}
        </div>
      )}
      
      <Modal
        isOpen={deleteModalOpen}
        closeModal={closeDeleteModal}
        title={t('deleteProgram')}
      >
        <div className="p-4">
          <p className="mb-4 text-gray-800 dark:text-gray-200">{t('confirmDeleteProgram')}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={closeDeleteModal}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {t('cancel', { ns: 'common' })}
            </button>
            <button
              onClick={confirmDeleteProgram}
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

export default ProgramList;
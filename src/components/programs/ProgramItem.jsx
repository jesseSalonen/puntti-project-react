import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';

const ProgramItem = ({ program, onDelete }) => {
  const { t } = useTranslation(['programs', 'common']);
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {program.name}
          </h2>
          <div className="flex space-x-2">
            <Link to={`/programs/edit/${program._id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <FaEdit size={18} />
            </Link>
            <button
              onClick={() => onDelete(program._id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
        
        {program.description && (
          <p className="mb-3 text-gray-600 dark:text-gray-300">
            {program.description}
          </p>
        )}
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FaCalendarAlt className="mr-1" />
          <span>{program.schedule ? program.schedule.length : 0} {t('days')}</span>
        </div>
        
        <Link
          to={`/programs/${program._id}`}
          className="mt-4 flex w-full items-center justify-center rounded-md bg-green-100 py-2 text-center font-medium text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
        >
          {t('viewDetails', { ns: 'common' })}
        </Link>
      </div>
    </div>
  );
};

export default ProgramItem;
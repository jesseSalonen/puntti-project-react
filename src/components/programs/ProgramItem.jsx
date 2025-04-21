import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash, FaDumbbell, FaBed, FaUser, FaClock } from 'react-icons/fa';
import CommonHelpers from '../../helpers/CommonHelpers';

const ProgramItem = ({ program, onDelete }) => {
  const { t } = useTranslation(['programs', 'common', 'workouts', 'exercises']);
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5">
        <div className="mb-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {program.name}
          </h2>
        </div>
        
        {program.description && (
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            {program.description}
          </p>
        )}
        
        <div className="flex flex-col">
          <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaClock className="mr-1" />
            <span>{t('createdAt', { ns: 'exercises' })}: {CommonHelpers.getDateTimeText(new Date(program.createdAt))}</span>
          </div>
          {program.user && (
            <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaUser className="mr-1" /> 
              <span>{t('createdBy', { ns: 'exercises' })}: {program.user.name}</span>
            </div>
          )}
        </div>
        
        {program.schedule && program.schedule.length > 0 && (
          <div className="mt-3 mb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t('programSchedule', { ns: 'programs' })}:
            </h3>
            <div className="space-y-3">
              {program.schedule.map((day, index) => (
                <div 
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                    <div className="flex items-center">
                      {day.type === 'workout' ? (
                        <>
                          <FaDumbbell className="text-green-500 mr-2" />
                          <h4 className="font-semibold">
                            {t('day')} {index + 1}: {day.workout?.name || t('selectWorkout', { ns: 'programs' })}
                          </h4>
                        </>
                      ) : (
                        <>
                          <FaBed className="text-blue-500 mr-2" />
                          <h4 className="font-semibold">{t('day')} {index + 1}: {t('restDay', { ns: 'programs' })}</h4>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/programs/${program._id}`}>
            <button
              className="
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-md
                py-2
                px-4
                text-center
                transition-colors
                duration-200
                bg-white
                text-gray-800
                border
                border-green-200
                shadow-sm
                hover:bg-green-50
                hover:text-green-700
                dark:border-none
                dark:bg-[#2A3540]
                dark:text-[#CFD7E5]
                dark:hover:bg-[#3A4549]
                dark:hover:text-green-400
              "
              aria-label={t('edit', { ns: 'common' })}
            >
              <FaEdit className="mr-1" /> {t('edit', { ns: 'common' })}
            </button>
          </Link>
          <button
            onClick={() => onDelete(program._id)}
            className="
              flex
              cursor-pointer
              items-center
              justify-center
              rounded-md
              py-2
              px-4
              text-center
              transition-colors
              duration-200
              bg-white
              text-gray-800
              border
              border-red-200
              shadow-sm
              hover:bg-red-50
              hover:text-red-700
              dark:border-none
              dark:bg-[#2A3540]
              dark:text-[#CFD7E5]
              dark:hover:bg-[#3A4549]
              dark:hover:text-red-400
            "
              aria-label={t('delete', { ns: 'common' })}
            >
              <FaTrash className="mr-1" /> {t('delete', { ns: 'common' })}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramItem;
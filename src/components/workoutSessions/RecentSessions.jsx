import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Spinner from '../common/Spinner.jsx';
import {
  getRecentWorkoutSessions,
  reset,
  selectWorkoutSessions
} from '../../features/workoutSessions/workoutSessionSlice.js';

const RecentSessions = () => {
  const { t } = useTranslation(['workoutSessions', 'programs', 'common']);
  const dispatch = useDispatch();
  const { recentSessions, isLoading, isError, message } = useSelector(selectWorkoutSessions);

  useEffect(() => {
    dispatch(getRecentWorkoutSessions());

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
      <h2 className="text-2xl font-bold mb-4">{t('recentSessions')}</h2>

      {/* Program-linked sessions */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{t('programSessions')}</h3>
        {recentSessions?.programSessions?.length > 0 ? (
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {recentSessions.programSessions.map((session) => (
              <li key={session._id} className="p-4 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{session.programName}</h4>
                    <p className="text-sm text-gray-500">
                      {session.date && new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{session.duration} {t('common:minutes')}</span>
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 p-4 bg-gray-50 rounded">{t('noRecentProgramSessions')}</p>
        )}
      </div>

      {/* Standalone workout sessions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">{t('standaloneSessions')}</h3>
        {recentSessions?.standaloneSessions?.length > 0 ? (
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {recentSessions.standaloneSessions.map((session) => (
              <li key={session._id} className="p-4 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{session.workoutName || t('common:workout')}</h4>
                    <p className="text-sm text-gray-500">
                      {session.date && new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {session.duration && (
                      <span className="text-sm text-gray-600">{session.duration} {t('common:minutes')}</span>
                    )}
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 p-4 bg-gray-50 rounded">{t('noRecentStandaloneSessions')}</p>
        )}
      </div>
    </div>
  );
};

export default RecentSessions;

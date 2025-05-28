import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SESSION_STATUS} from '../../helpers/constants.js';

const RecentSessions = ({workoutSessions}) => {
  const [recentSessions, setRecentSessions] = useState({programSessions: [], standaloneSessions: []});
  const {t} = useTranslation(['workoutSessions', 'programs', 'common']);

  // Process sessions only when workoutSessions change
  useEffect(() => {
    if (workoutSessions && workoutSessions.length > 0) {
      const programSessions = workoutSessions
        .filter(session => session.program?._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

      const standaloneSessions = workoutSessions
        .filter(session => !session.program?._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

      setRecentSessions({programSessions, standaloneSessions});
    }
  }, [workoutSessions]);

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
                    <h4 className="font-medium">{session.workout?.name}</h4>
                    <p className="text-sm text-gray-500">
                      {session.createdAt && new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {session.status === SESSION_STATUS.completed && (
                      <span className="text-sm text-gray-600">
                      {session.completedAt && session.createdAt
                        ? `${Math.round((new Date(session.completedAt) - new Date(session.createdAt)) / 60000)} ${t('minutes', {ns: 'common'})}`
                        : t('noValue', {ns: 'common'})}
                    </span>
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
                    <h4 className="font-medium">{session.workout?.name || t('common:workout')}</h4>
                    <p className="text-sm text-gray-500">
                      {session.createdAt && new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {session.status === SESSION_STATUS.completed && (
                      <span className="text-sm text-gray-600">
                        {session.completedAt && session.createdAt
                          ? `${Math.round((new Date(session.completedAt) - new Date(session.createdAt)) / 60000)} ${t('minutes', {ns: 'common'})}`
                          : t('noValue', {ns: 'common'})}
                      </span>
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

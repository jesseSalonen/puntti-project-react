import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {FaClock, FaPlay, FaRedo, FaBed, FaDumbbell, FaCalendarAlt} from 'react-icons/fa';
import {SESSION_STATUS} from '../../helpers/constants.js';
import {createWorkoutSession} from '../../features/workoutSessions/workoutSessionSlice.js';
import CommonHelpers from '../../helpers/CommonHelpers.js';

const RecentSessions = ({workoutSessions}) => {
  const [latestSession, setLatestSession] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const {t} = useTranslation(['workoutSessions', 'programs', 'common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Process sessions only when workoutSessions change
  useEffect(() => {
    if (workoutSessions && workoutSessions.length > 0) {
      // Create a copy and sort by date, take top 3
      const allSessions = [...workoutSessions]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setLatestSession(allSessions[0]);
      setRecentSessions(allSessions);
    }
  }, [workoutSessions]);

  const handleContinueSession = (sessionId) => {
    navigate(`/workout-sessions/${sessionId}`);
  };

  const handleStartWorkout = async (workoutId, programId = null, programDay = null) => {
    try {
      const sessionData = {
        workout: workoutId,
        program: programId,
        programDay: programDay
      };
      
      const result = await dispatch(createWorkoutSession(sessionData)).unwrap();
      navigate(`/workout-sessions/${result._id}`);
    } catch (error) {
      console.error('Failed to start workout session:', error);
    }
  };

  const getNextProgramDay = (program, currentDay) => {
    if (!program?.schedule || currentDay === null) return null;
    
    const nextDay = (currentDay + 1) % program.schedule.length;
    return {
      dayIndex: nextDay,
      dayData: program.schedule[nextDay]
    };
  };

  const getNextWorkoutInfo = () => {
    if (!latestSession) return null;

    // If session is in progress, show continue button
    if (latestSession.status === SESSION_STATUS.inProgress) {
      return {
        type: 'continue',
        sessionId: latestSession._id
      };
    }

    // If it's a program session, determine next workout
    if (latestSession.program?._id) {
      const nextDay = getNextProgramDay(latestSession.program, latestSession.programDay);
      
      if (nextDay?.dayData?.type === 'rest') {
        // Next day is rest, find the workout after rest
        const dayAfterRest = getNextProgramDay(latestSession.program, nextDay.dayIndex);
        if (dayAfterRest?.dayData?.type === 'workout' && dayAfterRest.dayData.workout) {
          return {
            type: 'startNextAfterRest',
            workoutId: dayAfterRest.dayData.workout,
            programId: latestSession.program._id,
            programDay: dayAfterRest.dayIndex,
            restDay: true
          };
        }
      } else if (nextDay?.dayData?.type === 'workout' && nextDay.dayData.workout) {
        return {
          type: 'startNext',
          workoutId: nextDay.dayData.workout,
          programId: latestSession.program._id,
          programDay: nextDay.dayIndex
        };
      }
    }

    // For standalone sessions or fallback, repeat the same workout
    return {
      type: 'startAgain',
      workoutId: latestSession.workout._id,
      programId: latestSession.program?._id,
      programDay: latestSession.programDay
    };
  };

  const renderNextWorkoutButton = () => {
    const nextWorkout = getNextWorkoutInfo();
    if (!nextWorkout) return null;

    switch (nextWorkout.type) {
      case 'continue':
        return (
          <button
            onClick={() => handleContinueSession(nextWorkout.sessionId)}
            className="flex items-center cursor-pointer rounded-md bg-gradient-to-r from-orange-500 to-orange-100 py-3 px-6 text-orange-800 hover:from-orange-600 hover:to-orange-200 transition-all font-semibold"
          >
            <FaPlay className="mr-2" />
            {t('continueWorkout')}
          </button>
        );
      
      case 'startNext':
        return (
          <button
            onClick={() => handleStartWorkout(nextWorkout.workoutId, nextWorkout.programId, nextWorkout.programDay)}
            className="flex items-center cursor-pointer rounded-md bg-gradient-to-r from-green-500 to-green-100 py-3 px-6 text-green-800 hover:from-green-600 hover:to-green-200 transition-all font-semibold"
          >
            <FaPlay className="mr-2" />
            {t('startNextWorkout')}
          </button>
        );
        
      case 'startNextAfterRest':
        return (
          <div className="space-y-3">
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-md">
              <FaBed className="mr-2" />
              <span>{t('youHaveEarnedRest')}</span>
            </div>
            <button
              onClick={() => handleStartWorkout(nextWorkout.workoutId, nextWorkout.programId, nextWorkout.programDay)}
              className="flex items-center cursor-pointer rounded-md bg-gradient-to-r from-green-500 to-green-100 py-3 px-6 text-green-800 hover:from-green-600 hover:to-green-200 transition-all font-semibold"
            >
              <FaPlay className="mr-2" />
              {t('startNextWorkout')}
            </button>
          </div>
        );
        
      case 'startAgain':
      default:
        return (
          <button
            onClick={() => handleStartWorkout(nextWorkout.workoutId, nextWorkout.programId, nextWorkout.programDay)}
            className="flex items-center cursor-pointer rounded-md bg-gradient-to-r from-green-500 to-green-100 py-3 px-6 text-green-800 hover:from-green-600 hover:to-green-200 transition-all font-semibold"
          >
            <FaRedo className="mr-2" />
            {t('startAgain', {ns: 'common'})}
          </button>
        );
    }
  };

  const renderSessionItem = (session, index) => {
    const isInProgress = session.status === SESSION_STATUS.inProgress;
    const isCompleted = session.status === SESSION_STATUS.completed;
    
    return (
      <div key={session._id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 py-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {session.program?.name || session.workout?.name || t('workout', {ns: 'common'})}
            </h4>
            {isInProgress && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs dark:bg-orange-900 dark:text-orange-200">
                {t('inProgress')}
              </span>
            )}
          </div>

          {session.program?.name && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {session.workout?.name}
            </p>
          )}

          <div className="flex items-center flex-wrap text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-4">
              <FaClock className="mr-1" />
              {CommonHelpers.getDateTimeText(new Date(session.createdAt))}
            </span>

            {session.program && (
              <span className="flex items-center mr-4">
                <FaCalendarAlt className="mr-1" />
                {t('day', {ns: 'programs'})} {session.programDay + 1}
              </span>
            )}

            {isCompleted && session.completedAt && (
              <span className="flex items-center text-green-600 dark:text-green-400">
                <FaDumbbell className="mr-1" />
                {Math.round((new Date(session.completedAt) - new Date(session.createdAt)) / 60000)} {t('minutes', {ns: 'common'})}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!recentSessions.length) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
        <div className="text-center">
          <FaDumbbell className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {t('noRecentSessions')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="p-6">
        {/* Next workout action */}
        <div className="mb-6">
          {renderNextWorkoutButton()}
        </div>
        
        {/* Recent sessions list */}
        <div className="space-y-0">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <FaDumbbell className="mr-2 text-blue-500" />
            {t('recentSessions')}
          </h3>
          {recentSessions.map((session, index) => renderSessionItem(session, index))}
        </div>
      </div>
    </div>
  );
};

export default RecentSessions;

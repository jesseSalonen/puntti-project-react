import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDumbbell, FaClock, FaFire, FaCalendarWeek } from 'react-icons/fa';
import { SESSION_STATUS } from '../../helpers/constants.js';

const WorkoutStats = ({ workoutSessions }) => {
  const { t } = useTranslation(['dashboard', 'common', 'workoutSessions']);

  const stats = useMemo(() => {
    if (!workoutSessions || workoutSessions.length === 0) {
      return {
        totalSessions: 0,
        completedSessions: 0,
        averageDuration: 0,
        thisWeekSessions: 0,
        completionRate: 0,
        totalVolume: 0,
        weeklyData: []
      };
    }

    const completed = workoutSessions.filter(session => session.status === SESSION_STATUS.completed);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeekSessions = workoutSessions.filter(
      session => new Date(session.createdAt) >= oneWeekAgo
    ).length;

    // Calculate average duration from completed sessions
    const durations = completed
      .filter(session => session.completedAt)
      .map(session => (new Date(session.completedAt) - new Date(session.createdAt)) / 60000);
    
    const averageDuration = durations.length > 0 
      ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length 
      : 0;

    // Calculate total volume (sum of all weights × reps)
    const totalVolume = completed.reduce((total, session) => {
      return total + (session.exercisePerformances || []).reduce((sessionTotal, performance) => {
        return sessionTotal + (performance.sets || []).reduce((setTotal, set) => {
          return setTotal + (set.weight || 0) * (set.reps || 0);
        }, 0);
      }, 0);
    }, 0);

    // Weekly activity data for the last 7 days
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const sessionsCount = workoutSessions.filter(session => {
        const sessionDate = new Date(session.createdAt);
        return sessionDate >= dayStart && sessionDate <= dayEnd;
      }).length;

      return {
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        sessions: sessionsCount
      };
    });

    return {
      totalSessions: workoutSessions.length,
      completedSessions: completed.length,
      averageDuration: Math.round(averageDuration),
      thisWeekSessions,
      completionRate: workoutSessions.length > 0 ? Math.round((completed.length / workoutSessions.length) * 100) : 0,
      totalVolume: Math.round(totalVolume),
      weeklyData
    };
  }, [workoutSessions]);

  const StatItem = ({ icon: Icon, label, value, color = "text-gray-600" }) => (
    <div className="flex flex-1 items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
      <Icon className={`text-xl ${color}`} />
      <div className="whitespace-nowrap">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  const WeeklyChart = ({ data }) => {
    const maxSessions = Math.max(...data.map(d => d.sessions), 1);
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('weeklyActivity', { ns: 'dashboard' })}
        </h4>
        <div className="flex items-end justify-between space-x-2 h-20">
          {data.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col justify-end h-16">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm transition-all duration-300"
                  style={{ 
                    height: `${Math.max((day.sessions / maxSessions) * 100, day.sessions > 0 ? 10 : 0)}%`,
                    minHeight: day.sessions > 0 ? '4px' : '0px'
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CompletionRateChart = ({ rate }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('completionRate', { ns: 'dashboard' })}
      </h4>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${rate}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2 block">
          {rate}%
        </span>
      </div>
    </div>
  );

  if (stats.totalSessions === 0) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
        <div className="text-center">
          <FaDumbbell className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('workoutStatistics', { ns: 'dashboard' })}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('noWorkoutData', { ns: 'dashboard' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 flex items-center">
        <FaDumbbell className="mr-2 text-blue-500" />
        {t('workoutStatistics', { ns: 'dashboard' })}
      </h3>
      
      <div className="flex w-full items-center gap-4 flex-wrap mb-6">
        <StatItem
          icon={FaDumbbell}
          label={t('totalWorkouts', { ns: 'dashboard' })}
          value={stats.totalSessions}
          color="text-blue-500"
        />
        <StatItem
          icon={FaClock}
          label={t('avgDuration', { ns: 'dashboard' })}
          value={`${stats.averageDuration} ${t('minutes', { ns: 'common' })}`}
          color="text-green-500"
        />
        <StatItem
          icon={FaCalendarWeek}
          label={t('thisWeek', { ns: 'dashboard' })}
          value={stats.thisWeekSessions}
          color="text-purple-500"
        />
        <StatItem
          icon={FaFire}
          label={t('totalVolume', { ns: 'dashboard' })}
          value={`${stats.totalVolume} kg`}
          color="text-orange-500"
        />
      </div>

      <div className="space-y-6">
        <WeeklyChart data={stats.weeklyData} />
        <CompletionRateChart rate={stats.completionRate} />
      </div>
    </div>
  );
};

export default WorkoutStats;
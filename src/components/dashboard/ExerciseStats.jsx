import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRunning, FaUsers, FaArrowUp, FaArrowDown, FaWeight, FaBolt } from 'react-icons/fa';

const ExerciseStats = ({ exercises, workoutSessions }) => {
  const { t } = useTranslation(['dashboard', 'common', 'exercises']);

  const stats = useMemo(() => {
    if (!exercises || exercises.length === 0 || !workoutSessions || workoutSessions.length === 0) {
      return {
        totalExercises: exercises?.length || 0,
        muscleGroups: [],
        mostUsedExercises: [],
        muscleDistribution: [],
        bodyPartStats: { upper: 0, lower: 0, pushing: 0, pulling: 0 }
      };
    }

    // Get all exercise performances from completed sessions
    const exercisePerformances = workoutSessions
      .filter(session => session.status === 'completed')
      .flatMap(session => session.exercisePerformances || []);

    // Count exercise usage
    const exerciseUsage = {};
    exercisePerformances.forEach(performance => {
      const exerciseId = performance.exercise._id;
      const exerciseName = performance.exercise.name;
      exerciseUsage[exerciseId] = {
        name: exerciseName,
        count: (exerciseUsage[exerciseId]?.count || 0) + 1,
        totalWeight: (exerciseUsage[exerciseId]?.totalWeight || 0) + 
          (performance.sets || []).reduce((sum, set) => sum + (set.weight || 0) * (set.reps || 0), 0)
      };
    });

    // Get most used exercises
    const mostUsedExercises = Object.values(exerciseUsage)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Analyze muscle groups
    const muscleGroupCounts = {};
    exercises.forEach(exercise => {
      (exercise.muscles || []).forEach(muscle => {
        muscleGroupCounts[muscle.name] = (muscleGroupCounts[muscle.name] || 0) + 1;
      });
    });

    const muscleGroups = Object.entries(muscleGroupCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6);

    // Body part distribution
    const bodyPartStats = exercises.reduce((acc, exercise) => {
      const muscles = exercise.muscles || [];
      muscles.forEach(muscle => {
        if (muscle.upper) acc.upper += 1;
        if (muscle.lower) acc.lower += 1;
        if (muscle.pushing) acc.pushing += 1;
        if (muscle.pulling) acc.pulling += 1;
      });
      return acc;
    }, { upper: 0, lower: 0, pushing: 0, pulling: 0 });

    // Create muscle distribution for chart
    const muscleDistribution = muscleGroups.map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / exercises.length) * 100)
    }));

    return {
      totalExercises: exercises.length,
      muscleGroups,
      mostUsedExercises,
      muscleDistribution,
      bodyPartStats
    };
  }, [exercises, workoutSessions]);

  const StatItem = ({ icon: Icon, label, value, color = "text-gray-600" }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
      <Icon className={`text-xl ${color}`} />
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  const MuscleDistributionChart = ({ data }) => {
    const maxCount = Math.max(...data.map(item => item.count), 1);
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('muscleGroupDistribution', { ns: 'dashboard' })}
        </h4>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-3">
              <div className="w-20 text-xs text-gray-600 dark:text-gray-400 truncate">
                {item.name}
              </div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index % 6 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                      index % 6 === 1 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                      index % 6 === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                      index % 6 === 3 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                      index % 6 === 4 ? 'bg-gradient-to-r from-pink-500 to-pink-400' :
                      'bg-gradient-to-r from-indigo-500 to-indigo-400'
                    }`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-xs text-gray-600 dark:text-gray-400 text-right">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BodyPartChart = ({ stats }) => {
    const total = stats.upper + stats.lower;
    const upperPercent = total > 0 ? (stats.upper / total) * 100 : 50;
    const lowerPercent = total > 0 ? (stats.lower / total) * 100 : 50;

    const totalMovement = stats.pushing + stats.pulling;
    const pushingPercent = totalMovement > 0 ? (stats.pushing / totalMovement) * 100 : 50;
    const pullingPercent = totalMovement > 0 ? (stats.pulling / totalMovement) * 100 : 50;

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('bodyPartBalance', { ns: 'dashboard' })}
        </h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span className="flex items-center">
                <FaArrowUp className="mr-1 text-blue-500" />
                {t('upperBody', { ns: 'dashboard' })} ({stats.upper})
              </span>
              <span className="flex items-center">
                <FaArrowDown className="mr-1 text-green-500" />
                {t('lowerBody', { ns: 'dashboard' })} ({stats.lower})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-400"
                  style={{ width: `${upperPercent}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${lowerPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span className="flex items-center">
                <FaBolt className="mr-1 text-orange-500" />
                {t('pushing', { ns: 'dashboard' })} ({stats.pushing})
              </span>
              <span className="flex items-center">
                <FaWeight className="mr-1 text-purple-500" />
                {t('pulling', { ns: 'dashboard' })} ({stats.pulling})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-400"
                  style={{ width: `${pushingPercent}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-400"
                  style={{ width: `${pullingPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MostUsedExercises = ({ exercises }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('mostUsedExercises', { ns: 'dashboard' })}
      </h4>
      <div className="space-y-2">
        {exercises.length > 0 ? exercises.map((exercise, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {exercise.name}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                {exercise.count}x
              </span>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('noExerciseData', { ns: 'dashboard' })}
          </p>
        )}
      </div>
    </div>
  );

  if (stats.totalExercises === 0) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
        <div className="text-center">
          <FaRunning className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('exerciseStatistics', { ns: 'dashboard' })}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('noExerciseData', { ns: 'dashboard' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 flex items-center">
        <FaRunning className="mr-2 text-green-500" />
        {t('exerciseStatistics', { ns: 'dashboard' })}
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatItem
          icon={FaRunning}
          label={t('totalExercises', { ns: 'dashboard' })}
          value={stats.totalExercises}
          color="text-green-500"
        />
        <StatItem
          icon={FaUsers}
          label={t('muscleGroups', { ns: 'dashboard' })}
          value={stats.muscleGroups.length}
          color="text-blue-500"
        />
      </div>

      <div className="space-y-6">
        {stats.muscleDistribution.length > 0 && (
          <MuscleDistributionChart data={stats.muscleDistribution} />
        )}
        <BodyPartChart stats={stats.bodyPartStats} />
        <MostUsedExercises exercises={stats.mostUsedExercises} />
      </div>
    </div>
  );
};

export default ExerciseStats;
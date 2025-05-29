import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartLine } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import { Select, MenuItem } from '@mui/material';
import { CustomSelect } from '../common/CustomSelect.js';
import {IoTrendingUp} from 'react-icons/io5';

const ExerciseProgress = ({ workoutSessions, isDarkMode }) => {
  const { t } = useTranslation(['dashboard', 'common', 'exercises']);
  const [selectedExercise, setSelectedExercise] = useState('');

  const exerciseData = useMemo(() => {
    if (!workoutSessions || workoutSessions.length === 0) {
      return {
        exerciseOptions: [],
        chartData: { series: [], categories: [] }
      };
    }

    // Get all completed sessions
    const completedSessions = workoutSessions.filter(session => 
      session.status === 'completed' && session.exercisePerformances && session.exercisePerformances.length > 0
    );

    if (completedSessions.length === 0) {
      return {
        exerciseOptions: [],
        chartData: { series: [], categories: [] }
      };
    }

    // Extract unique exercises that have been performed
    const exerciseMap = new Map();
    completedSessions.forEach(session => {
      session.exercisePerformances.forEach(performance => {
        if (performance.exercise && performance.sets && performance.sets.length > 0) {
          const exerciseId = performance.exercise._id;
          const exerciseName = performance.exercise.name;
          
          if (!exerciseMap.has(exerciseId)) {
            exerciseMap.set(exerciseId, {
              id: exerciseId,
              name: exerciseName,
              sessions: []
            });
          }
          
          // Add session data for this exercise
          const exerciseData = exerciseMap.get(exerciseId);
          const sessionDate = new Date(session.completedAt || session.createdAt).toLocaleDateString();
          
          // Calculate average weight and total reps for this session
          const validSets = performance.sets.filter(set => set.completed !== false);
          if (validSets.length > 0) {
            const avgWeight = validSets.reduce((sum, set) => sum + (set.weight || 0), 0) / validSets.length;
            const totalReps = validSets.reduce((sum, set) => sum + (set.reps || 0), 0);
            
            exerciseData.sessions.push({
              date: sessionDate,
              avgWeight: Math.round(avgWeight * 10) / 10,
              totalReps: totalReps,
              sessionId: session._id,
              timestamp: new Date(session.completedAt || session.createdAt)
            });
          }
        }
      });
    });

    // Filter exercises that appear in at least one session and sort by usage
    const exerciseOptions = Array.from(exerciseMap.values())
      .filter(exercise => exercise.sessions.length > 0)
      .map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        sessionCount: exercise.sessions.length
      }))
      .sort((a, b) => b.sessionCount - a.sessionCount);

    // Generate chart data for selected exercise
    let chartData = { series: [], categories: [] };
    if (selectedExercise && exerciseMap.has(selectedExercise)) {
      const exercise = exerciseMap.get(selectedExercise);
      
      // Sort sessions by date
      const sortedSessions = exercise.sessions.sort((a, b) => a.timestamp - b.timestamp);
      
      const categories = sortedSessions.map(session => session.date);
      const weightData = sortedSessions.map(session => session.avgWeight);
      const repsData = sortedSessions.map(session => session.totalReps);

      chartData = {
        series: [
          {
            name: t('avgWeight', { ns: 'dashboard' }),
            type: 'line',
            data: weightData
          },
          {
            name: t('totalReps', { ns: 'dashboard' }),
            type: 'column',
            data: repsData
          }
        ],
        categories: categories
      };
    }

    return { exerciseOptions, chartData };
  }, [workoutSessions, selectedExercise, t]);

  // Set default selected exercise to the most used one
  React.useEffect(() => {
    if (!selectedExercise && exerciseData.exerciseOptions.length > 0) {
      setSelectedExercise(exerciseData.exerciseOptions[0].id);
    }
  }, [exerciseData.exerciseOptions, selectedExercise]);

  const chartOptions = {
    chart: {
      type: 'line',
      height: window.innerWidth < 768 ? 250 : 350,
      toolbar: {
        show: false
      },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: isDarkMode ? ['#10B981', '#3B82F6'] : ['#059669', '#2563EB'],
    stroke: {
      width: [3, 0],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4
      }
    },
    fill: {
      type: ['solid', 'gradient'],
      gradient: {
        shade: isDarkMode ? 'dark' : 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: isDarkMode ? ['#34D399', '#60A5FA'] : ['#10B981', '#3B82F6'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.6,
      }
    },
    markers: {
      size: 6,
      colors: isDarkMode ? ['#10B981'] : ['#059669'],
      strokeColors: isDarkMode ? '#1F2937' : '#FFFFFF',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: exerciseData.chartData.categories,
      labels: {
        style: {
          colors: isDarkMode ? '#9CA3AF' : '#6B7280',
          fontSize: window.innerWidth < 768 ? '10px' : '12px'
        },
        rotate: window.innerWidth < 768 ? -45 : 0,
        maxHeight: window.innerWidth < 768 ? 60 : undefined
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: [
      {
        title: {
          text: window.innerWidth < 768 ? '' : t('weight', { ns: 'common' }),
          style: {
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontSize: window.innerWidth < 768 ? '10px' : '12px'
          }
        },
        labels: {
          style: {
            colors: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontSize: window.innerWidth < 768 ? '9px' : '12px'
          },
          formatter: (value) => window.innerWidth < 768 ? `${value}kg` : `${value} kg`
        }
      },
      {
        opposite: true,
        title: {
          text: window.innerWidth < 768 ? '' : t('reps', { ns: 'common' }),
          style: {
            color: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontSize: window.innerWidth < 768 ? '10px' : '12px'
          }
        },
        labels: {
          style: {
            colors: isDarkMode ? '#9CA3AF' : '#6B7280',
            fontSize: window.innerWidth < 768 ? '9px' : '12px'
          }
        }
      }
    ],
    grid: {
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: isDarkMode ? '#9CA3AF' : '#6B7280'
      }
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      x: {
        show: true
      },
      y: [
        {
          formatter: (value) => `${value} kg`
        },
        {
          formatter: (value) => `${value} reps`
        }
      ]
    }
  };

  if (exerciseData.exerciseOptions.length === 0) {
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
        <div className="text-center">
          <FaChartLine className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('exerciseProgress', { ns: 'dashboard' })}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('noProgressData', { ns: 'dashboard' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <IoTrendingUp className="mr-2 text-purple-500" />
          <span className="max-sm:text-base">{t('exerciseProgress', { ns: 'dashboard' })}</span>
        </h3>
        <div className="w-full sm:min-w-[200px] sm:max-w-[250px]">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm transition-all
                        focus:border-green-500 focus:ring-0 focus:shadow-md
                        hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                        dark:focus:border-green-500 dark:hover:border-green-700"
          >
            {exerciseData.exerciseOptions.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.sessionCount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedExercise && exerciseData.chartData.series.length > 0 ? (
        <div className="mt-4">
          <Chart
            options={chartOptions}
            series={exerciseData.chartData.series}
            height={window.innerWidth < 768 ? 250 : 350}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <FaChartLine className="mx-auto text-2xl mb-2" />
            <p>{t('selectExercise', { ns: 'dashboard' })}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseProgress;
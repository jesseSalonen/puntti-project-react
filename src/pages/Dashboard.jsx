import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useOutletContext} from 'react-router-dom';
import {selectUserName} from '../features/auth/authSlice';
import RecentSessions from '../components/workoutSessions/RecentSessions.jsx';
import WorkoutStats from '../components/dashboard/WorkoutStats.jsx';
import ExerciseStats from '../components/dashboard/ExerciseStats.jsx';
import ExerciseProgress from '../components/dashboard/ExerciseProgress.jsx';
import {getWorkoutSessions, reset, selectWorkoutSessions} from '../features/workoutSessions/workoutSessionSlice.js';
import {getExercises, reset as resetExercises, selectExercises} from '../features/exercises/exerciseSlice.js';
import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import Spinner from '../components/common/Spinner.jsx';

// [
//   {
//     "_id": "680e8a3b230798073110ea02",
//     "user": {
//       "_id": "67df3720ed6223268cd3ecd4",
//       "subscribedPrograms": []
//     },
//     "workout": {
//       "_id": "6805f1af4432bad5ed4a34c9",
//       "user": "67df3720ed6223268cd3ecd4",
//       "name": "Vetävät 1",
//       "description": "Vetävien lihasten treeni. Sekä ylä- että alakroppa.",
//       "exercises": [
//         {
//           "exercise": "68023b31bcfe57aad75f4a86",
//           "sets": [
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cb"
//             },
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cc"
//             },
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cd"
//             }
//           ],
//           "_id": "6805f8db4432bad5ed4a3705"
//         },
//         {
//           "exercise": "6805f14c4432bad5ed4a34a4",
//           "sets": [
//             {
//               "reps": 12,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cf"
//             },
//             {
//               "reps": 5,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34d0"
//             },
//             {
//               "reps": 8,
//               "dropSet": true,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34d1"
//             },
//             {
//               "reps": 2,
//               "dropSet": true,
//               "restPause": true,
//               "_id": "6805f5634432bad5ed4a36ab"
//             }
//           ],
//           "_id": "6805f8db4432bad5ed4a3709"
//         }
//       ],
//       "createdAt": "2025-04-21T07:20:15.101Z",
//       "updatedAt": "2025-04-21T07:50:51.824Z",
//       "__v": 0
//     },
//     "program": {
//       "_id": "680bd434e812b489a17002da",
//       "user": "67df3720ed6223268cd3ecd4",
//       "name": "Ensimmäinen ohjelma",
//       "description": "Ohjelman kuvaus",
//       "schedule": [
//         {
//           "type": "workout",
//           "workout": "6805f1af4432bad5ed4a34c9",
//           "_id": "680bd434e812b489a17002db"
//         },
//         {
//           "type": "rest",
//           "_id": "680bd434e812b489a17002dc"
//         }
//       ],
//       "createdAt": "2025-04-25T18:28:04.854Z",
//       "updatedAt": "2025-04-25T18:28:04.854Z",
//       "__v": 0
//     },
//     "programDay": 0,
//     "status": "in-progress",
//     "exercisePerformances": [
//       {
//         "exercise": {
//           "_id": "68023b31bcfe57aad75f4a86",
//           "user": "67df3720ed6223268cd3ecd4",
//           "name": "Kyykky",
//           "description": "Normaali kyykky tangolla",
//           "muscles": [
//             {
//               "_id": "68023b0cbcfe57aad75f4a7b",
//               "name": "Etureisi",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:12.454Z",
//               "updatedAt": "2025-04-18T11:44:12.454Z",
//               "__v": 0
//             },
//             {
//               "_id": "68023b19bcfe57aad75f4a7f",
//               "name": "Takareisi",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:25.632Z",
//               "updatedAt": "2025-04-18T11:44:25.632Z",
//               "__v": 0
//             },
//             {
//               "_id": "68023b21bcfe57aad75f4a83",
//               "name": "Pakara",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:33.346Z",
//               "updatedAt": "2025-04-18T11:44:33.346Z",
//               "__v": 0
//             }
//           ],
//           "createdAt": "2025-04-18T11:44:49.849Z",
//           "updatedAt": "2025-04-18T11:44:49.849Z",
//           "__v": 0
//         },
//         "sets": [
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea04"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea05"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea06"
//           }
//         ],
//         "_id": "680e8a3b230798073110ea03"
//       },
//       {
//         "exercise": {
//           "_id": "6805f14c4432bad5ed4a34a4",
//           "user": "67df3720ed6223268cd3ecd4",
//           "name": "Ylätalja leveällä myötäotteella",
//           "description": "Normaali ylätalja leveällä myötäotteella",
//           "muscles": [
//             {
//               "_id": "6805f10b4432bad5ed4a3495",
//               "name": "Hauis",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:31.693Z",
//               "updatedAt": "2025-04-21T07:17:31.693Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f1154432bad5ed4a3499",
//               "name": "Latsit",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:41.259Z",
//               "updatedAt": "2025-04-21T07:17:41.259Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f11e4432bad5ed4a349d",
//               "name": "Takaolkapää",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:50.614Z",
//               "updatedAt": "2025-04-21T07:17:50.614Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f12e4432bad5ed4a34a1",
//               "name": "Yläselkä",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:18:06.644Z",
//               "updatedAt": "2025-04-21T07:18:06.644Z",
//               "__v": 0
//             }
//           ],
//           "createdAt": "2025-04-21T07:18:36.360Z",
//           "updatedAt": "2025-04-21T07:18:36.360Z",
//           "__v": 0
//         },
//         "sets": [
//           {
//             "weight": 0,
//             "reps": 12,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea08"
//           },
//           {
//             "weight": 0,
//             "reps": 5,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea09"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": true,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea0a"
//           },
//           {
//             "weight": 0,
//             "reps": 2,
//             "dropSet": true,
//             "restPause": true,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8a3b230798073110ea0b"
//           }
//         ],
//         "_id": "680e8a3b230798073110ea07"
//       }
//     ],
//     "notes": "",
//     "completedAt": null,
//     "createdAt": "2025-04-27T19:49:15.503Z",
//     "updatedAt": "2025-04-27T19:49:15.503Z",
//     "__v": 0
//   },
//   {
//     "_id": "680e8ae9230798073110eb00",
//     "user": {
//       "_id": "67df3720ed6223268cd3ecd4",
//       "subscribedPrograms": []
//     },
//     "workout": {
//       "_id": "6805f1af4432bad5ed4a34c9",
//       "user": "67df3720ed6223268cd3ecd4",
//       "name": "Vetävät 1",
//       "description": "Vetävien lihasten treeni. Sekä ylä- että alakroppa.",
//       "exercises": [
//         {
//           "exercise": "68023b31bcfe57aad75f4a86",
//           "sets": [
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cb"
//             },
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cc"
//             },
//             {
//               "reps": 8,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cd"
//             }
//           ],
//           "_id": "6805f8db4432bad5ed4a3705"
//         },
//         {
//           "exercise": "6805f14c4432bad5ed4a34a4",
//           "sets": [
//             {
//               "reps": 12,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34cf"
//             },
//             {
//               "reps": 5,
//               "dropSet": false,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34d0"
//             },
//             {
//               "reps": 8,
//               "dropSet": true,
//               "restPause": false,
//               "_id": "6805f1af4432bad5ed4a34d1"
//             },
//             {
//               "reps": 2,
//               "dropSet": true,
//               "restPause": true,
//               "_id": "6805f5634432bad5ed4a36ab"
//             }
//           ],
//           "_id": "6805f8db4432bad5ed4a3709"
//         }
//       ],
//       "createdAt": "2025-04-21T07:20:15.101Z",
//       "updatedAt": "2025-04-21T07:50:51.824Z",
//       "__v": 0
//     },
//     "program": null,
//     "programDay": null,
//     "status": "in-progress",
//     "exercisePerformances": [
//       {
//         "exercise": {
//           "_id": "68023b31bcfe57aad75f4a86",
//           "user": "67df3720ed6223268cd3ecd4",
//           "name": "Kyykky",
//           "description": "Normaali kyykky tangolla",
//           "muscles": [
//             {
//               "_id": "68023b0cbcfe57aad75f4a7b",
//               "name": "Etureisi",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:12.454Z",
//               "updatedAt": "2025-04-18T11:44:12.454Z",
//               "__v": 0
//             },
//             {
//               "_id": "68023b19bcfe57aad75f4a7f",
//               "name": "Takareisi",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:25.632Z",
//               "updatedAt": "2025-04-18T11:44:25.632Z",
//               "__v": 0
//             },
//             {
//               "_id": "68023b21bcfe57aad75f4a83",
//               "name": "Pakara",
//               "upper": false,
//               "lower": true,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-18T11:44:33.346Z",
//               "updatedAt": "2025-04-18T11:44:33.346Z",
//               "__v": 0
//             }
//           ],
//           "createdAt": "2025-04-18T11:44:49.849Z",
//           "updatedAt": "2025-04-18T11:44:49.849Z",
//           "__v": 0
//         },
//         "sets": [
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb02"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb03"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb04"
//           }
//         ],
//         "_id": "680e8ae9230798073110eb01"
//       },
//       {
//         "exercise": {
//           "_id": "6805f14c4432bad5ed4a34a4",
//           "user": "67df3720ed6223268cd3ecd4",
//           "name": "Ylätalja leveällä myötäotteella",
//           "description": "Normaali ylätalja leveällä myötäotteella",
//           "muscles": [
//             {
//               "_id": "6805f10b4432bad5ed4a3495",
//               "name": "Hauis",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:31.693Z",
//               "updatedAt": "2025-04-21T07:17:31.693Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f1154432bad5ed4a3499",
//               "name": "Latsit",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:41.259Z",
//               "updatedAt": "2025-04-21T07:17:41.259Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f11e4432bad5ed4a349d",
//               "name": "Takaolkapää",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:17:50.614Z",
//               "updatedAt": "2025-04-21T07:17:50.614Z",
//               "__v": 0
//             },
//             {
//               "_id": "6805f12e4432bad5ed4a34a1",
//               "name": "Yläselkä",
//               "upper": true,
//               "lower": false,
//               "pushing": false,
//               "pulling": true,
//               "createdAt": "2025-04-21T07:18:06.644Z",
//               "updatedAt": "2025-04-21T07:18:06.644Z",
//               "__v": 0
//             }
//           ],
//           "createdAt": "2025-04-21T07:18:36.360Z",
//           "updatedAt": "2025-04-21T07:18:36.360Z",
//           "__v": 0
//         },
//         "sets": [
//           {
//             "weight": 0,
//             "reps": 12,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb06"
//           },
//           {
//             "weight": 0,
//             "reps": 5,
//             "dropSet": false,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb07"
//           },
//           {
//             "weight": 0,
//             "reps": 8,
//             "dropSet": true,
//             "restPause": false,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb08"
//           },
//           {
//             "weight": 0,
//             "reps": 2,
//             "dropSet": true,
//             "restPause": true,
//             "completed": false,
//             "notes": "",
//             "_id": "680e8ae9230798073110eb09"
//           }
//         ],
//         "_id": "680e8ae9230798073110eb05"
//       }
//     ],
//     "notes": "",
//     "completedAt": null,
//     "createdAt": "2025-04-27T19:52:09.896Z",
//     "updatedAt": "2025-04-27T20:17:30.653Z",
//     "__v": 0
//   },
// ]

function Dashboard() {
  const {t} = useTranslation(['workoutSessions', 'workouts', 'common', 'dashboard']);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const context = useOutletContext() || {};
  const { darkMode = false } = context;
  const { workoutSessions, isLoading, isError, message } = useSelector(selectWorkoutSessions);
  const { exercises, isLoading: exercisesLoading, isError: exercisesError, message: exercisesMessage } = useSelector(selectExercises);

  useEffect(() => {
    dispatch(getWorkoutSessions());
    dispatch(getExercises());

    return () => {
      dispatch(reset());
      dispatch(resetExercises());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (exercisesError) {
      toast.error(exercisesMessage);
    }
  }, [isError, message, exercisesError, exercisesMessage]);

  if (isLoading || exercisesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="mb-12 py-0 px-5 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">
          {t('welcome', {ns: 'dashboard', name: userName})}
        </h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t('isWorkoutDone', {ns: 'dashboard'})}
        </p>
      </section>
      <section className="py-0 px-5 space-y-6">
        <RecentSessions workoutSessions={workoutSessions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkoutStats workoutSessions={workoutSessions} />
          <ExerciseStats exercises={exercises} workoutSessions={workoutSessions} />
        </div>
        
        <ExerciseProgress workoutSessions={workoutSessions} isDarkMode={darkMode} />
      </section>
    </>
  );
}

export default Dashboard;

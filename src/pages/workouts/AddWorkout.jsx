import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import ExerciseTable from "../../components/exercises/ExerciseTable";
import {useDispatch, useSelector} from 'react-redux';
import {createWorkout, reset, selectWorkouts} from '../../features/workouts/workoutSlice.js';
import GenericWorkoutInfo from '../../components/workouts/GenericWorkoutInfo.jsx';
import WorkoutExerciseItem from '../../components/workouts/WorkoutExerciseItem.jsx';
import { toast } from 'react-toastify';
import Spinner from '../../components/common/Spinner';

function AddWorkout() {
  const { t } = useTranslation(["workouts", "common"]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([]);

  const { isLoading, isError, isSuccess, message } = useSelector(selectWorkouts);
  const dispatch = useDispatch();

  useEffect(() => {
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
    if (isSuccess) {
      toast.success(t('workoutAdded'));
      clearFields();
    }
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate that name is provided
    if (!name.trim()) {
      toast.error(t('nameRequired', {ns: 'common'}));
      return;
    }

    // validate that workout has atleast one exercise
    if (workoutExercises.length === 0) {
      toast.error(t('workoutMustHaveExercises'));
      return;
    }

    // Validate that all exercises have at least one set
    const exercisesWithEmptySets = workoutExercises.filter(exercise => exercise.sets.length === 0);
    
    if (exercisesWithEmptySets.length > 0) {
      // Find the names of exercises with empty sets
      const exerciseNames = exercisesWithEmptySets.map(ex => ex.name).join(', ');
      toast.error(`${t('exercisesNeedSets')}: ${exerciseNames}`);
      return;
    }
    
    dispatch(createWorkout({ name, description, workoutExercises }));
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setWorkoutExercises([]);
  };

  const handleAddExerciseToWorkout = (exercise) => {
    // Check if exercise already exists in workout
    const exists = workoutExercises.some(ex => ex._id === exercise._id);
    
    if (!exists) {
      // Add exercise with empty sets array
      const updatedExercises = [
        ...workoutExercises,
        {
          ...exercise,
          sets: []
        }
      ];
      setWorkoutExercises(updatedExercises);
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    setWorkoutExercises(workoutExercises.filter(ex => ex._id !== exerciseId));
  };

  const handleAddSet = (exerciseId) => {
    // Use functional update pattern to ensure we're working with latest state
    setWorkoutExercises(prevExercises => 
      prevExercises.map(ex => {
        if (ex._id === exerciseId) {
          return {
            ...ex,
            sets: [...ex.sets, { reps: 0, dropSet: false, restPause: false }]
          };
        }
        return ex;
      })
    );
  };
  
  const handleRemoveSet = (exerciseId, setIndex) => {
    // Use functional update pattern to ensure we're working with latest state
    setWorkoutExercises(prevExercises => 
      prevExercises.map(ex => {
        if (ex._id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.filter((_, index) => index !== setIndex)
          };
        }
        return ex;
      })
    );
  };
  
  const handleUpdateSet = (exerciseId, setIndex, updatedSet) => {
    // Use functional update pattern to ensure we're working with latest state
    setWorkoutExercises(prevExercises => 
      prevExercises.map(ex => {
        if (ex._id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((set, index) => 
              index === setIndex ? updatedSet : set
            )
          };
        }
        return ex;
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <div className="mx-auto w-11/12 lg:w-3/4">
      <div className="mb-8 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-2 text-4xl lg:text-5xl">{t("addWorkout")}</h1>
      </div>
      <form onSubmit={onSubmit}>
        <GenericWorkoutInfo
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
        />
        
        <div className="mt-8 mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">{t("workoutExercises")}</h2>
            <span className="ml-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-100">
              {workoutExercises.length}
            </span>
          </div>
          
          {workoutExercises.length > 0 ? (
            <div className="space-y-4">
              {workoutExercises.map(exercise => (
                <WorkoutExerciseItem
                  key={exercise._id}
                  exercise={exercise}
                  onRemove={handleRemoveExercise}
                  onAddSet={handleAddSet}
                  onRemoveSet={handleRemoveSet}
                  onUpdateSet={handleUpdateSet}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {t("noExercisesInWorkout")}
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">{t("availableExercises")}</h2>
          <ExerciseTable onAddExercise={handleAddExerciseToWorkout} />
        </div>
        
        <div className="mb-10 px-4 sm:px-10">
          <button
            className="
              mb-5
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              rounded-md
              bg-gradient-to-r
              from-green-400
              to-green-500
              py-4
              px-5
              text-center
              text-lg
              font-bold
              text-green-800
              shadow-md
              hover:shadow-lg
              transition-all
              hover:scale-[0.98]
              dark:text-white
            "
            type="submit"
          >
            {t("addWorkout")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkout;

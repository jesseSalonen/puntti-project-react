import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { createWorkout } from "../../features/workouts/workoutSlice";
import GenericWorkoutInfo from "../workouts/GenericWorkoutInfo";

function WorkoutForm() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseMuscles, setExerciseMuscles] = useState([]);
  const [addMuscleModalOpen, setAddMuscleModalOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createWorkout({ name, description, exerciseMuscles }));
    clearFields();
  };

  const addMuscle = (muscleId) => {
    let originalList = [...exerciseMuscles];
    if (!originalList.includes(muscleId)) {
      originalList.push(muscleId);
      setExerciseMuscles(originalList);
    }
  };

  const removeMuscle = (muscleId) => {
    let originalList = [...exerciseMuscles];

    const index = originalList.indexOf(muscleId);
    if (index > -1) {
      originalList.splice(index, 1);
    }

    setExerciseMuscles(originalList);
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setExerciseMuscles([]);
  };

  const closeAddMuscleModal = () => {
    setAddMuscleModalOpen(false);
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <GenericWorkoutInfo
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
        />

      </form>
    </section>
  );
}

export default WorkoutForm;

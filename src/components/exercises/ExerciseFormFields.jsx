import React, { useState } from 'react';
import GenericInfo from './GenericInfo';
import MuscleInfo from './MuscleInfo';
import { useTranslation } from 'react-i18next';
import MuscleForm from './MuscleForm';

function ExerciseFormFields({ name, setName, description, setDescription, exerciseMuscles, setExerciseMuscles, setAddMuscleModalOpen }) {
  const { t } = useTranslation();

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

  return (
    <>
      <GenericInfo
        setName={setName}
        name={name}
        setDescription={setDescription}
        description={description}
      />
      <MuscleInfo
        addMuscle={addMuscle}
        removeMuscle={removeMuscle}
        setAddMuscleModalOpen={setAddMuscleModalOpen}
        exerciseMuscles={exerciseMuscles}
      />
    </>
  );
}

export default ExerciseFormFields;

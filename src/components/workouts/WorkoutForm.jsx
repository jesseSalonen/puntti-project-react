import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { createWorkout } from "../../features/workouts/workoutSlice";
import GenericInfo from "../exercises/GenericInfo";
import MuscleInfo from "../exercises/MuscleInfo";
import Modal from "../Modal";
import MuscleForm from "../exercises/MuscleForm";

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
        <div className="mb-3">
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
              py-3 
              px-5 
              text-center 
              text-base 
              font-bold 
              text-green-800
              hover:scale-95
            "
            type="submit"
          >
            {t("addExercise")}
          </button>
        </div>
      </form>
      <Modal
        isOpen={addMuscleModalOpen}
        closeModal={closeAddMuscleModal}
        title={t("muscleInfo")}
      >
        <MuscleForm closeModal={closeAddMuscleModal} />
      </Modal>
    </section>
  );
}

export default WorkoutForm;

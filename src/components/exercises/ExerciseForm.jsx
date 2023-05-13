import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { createExercise } from "../../features/exercises/exerciseSlice";
import GenericInfo from "./GenericInfo";
import MuscleInfo from "./MuscleInfo";
import Modal from "../Modal";
import MuscleForm from "./MuscleForm";

function ExerciseForm() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseMuscles, setExerciseMuscles] = useState([]);
  const [addMuscleModalOpen, setAddMuscleModalOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExercise({ name, description, exerciseMuscles }));
    clearFields();
  };

  const addMuscle = (muscle) => {
    let originalList = [...exerciseMuscles];
    console.log(exerciseMuscles);
    console.log(originalList);
    originalList.push(muscle);
    console.log(originalList);
    setExerciseMuscles(originalList);
  };

  const removeMuscle = (muscle) => {
    let originalList = [...exerciseMuscles];

    originalList.push(muscle);

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
    <section
      className="
        my-0
        mx-auto
        w-3/4
        max-sm:w-11/12
      "
    >
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

export default ExerciseForm;

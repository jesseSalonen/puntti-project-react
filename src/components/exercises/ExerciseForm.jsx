import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "../../features/exercises/exerciseSlice";
import { useTranslation } from "react-i18next";
import GenericInfo from "./GenericInfo";
import MuscleInfo from "./MuscleInfo";

function ExerciseForm() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseMuscles, setExerciseMuscles] = useState([]);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExercise({ name, description, exerciseMuscles }));
    clearFields();
  };

  const addMuscle = (muscle) => {
    let originalList = [...exerciseMuscles];

    originalList.push(muscle);

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
        <MuscleInfo addMuscle={addMuscle} removeMuscle={removeMuscle} />
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
              border 
              border-solid 
              border-black 
              bg-black 
              py-3 
              px-5 
              text-center 
              text-base 
              font-bold 
              text-white
              hover:scale-95
            "
            type="submit"
          >
            {t("addExercise")}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExerciseForm;

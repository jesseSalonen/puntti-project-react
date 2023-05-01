import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "../features/exercises/exerciseSlice";
import { useTranslation } from "react-i18next";
import { getMuscles, reset } from "../features/muscles/muscleSlice";
import Spinner from "./Spinner";

function ExerciseForm() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseMuscles, setExerciseMuscles] = useState([]);

  const dispatch = useDispatch();
  const { muscles, isLoading, isError, message } = useSelector(
    (state) => state.muscles
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMuscles());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section
      className="
        my-0
        mx-auto
        w-3/4
        rounded-md
        border
        border-solid
        border-gray-200
        bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
        from-gray-200
        to-gray-50
        p-10
        drop-shadow-md
        max-sm:w-11/12
        max-sm:p-5
      "
    >
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="mt-0 mr-0 mb-1 ml-1 block text-left" htmlFor="name">
            {t("exerciseName")}
          </label>
          <input
            className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="mb-3 w-1/2 max-sm:w-full">
            <label
              className="mt-0 mr-0 mb-1 ml-1 block text-left"
              htmlFor="description"
            >
              {t("exerciseDesc")}
            </label>
            <textarea
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
              name="description"
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3 w-1/2 max-sm:w-full">
            <label
              className="mt-0 mr-0 mb-1 ml-1 block text-left"
              htmlFor="muscleList"
            >
              {t("exerciseMuscles")}
            </label>
            <select
              name="muscleList"
              id="muscleList"
              onChange={(e) => addMuscle(e.target.value)}
              defaultValue={"default"}
            >
              <option value={"default"}>{t("ChooseExerciseMuscle")}</option>
              {muscles.map((muscle) => (
                <option value={muscle.id}>{muscle.name}</option>
              ))}
            </select>
          </div>
        </div>
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

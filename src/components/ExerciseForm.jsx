import { useState } from "react";
import { useDispatch } from "react-redux";
import { createExercise } from "../features/exercises/exerciseSlice";
import { useTranslation } from "react-i18next";

function ExerciseForm() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExercise({ name, description }));
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setDescription("");
  };

  return (
    <section className="my-0 mx-auto w-3/4 max-sm:w-11/12">
      <form onSubmit={onSubmit} className="[&>div>input]:">
        <div className="mb-3">
          <label className="mt-0 mr-0 mb-1 ml-1 block text-left" htmlFor="name">
            {t("exerciseName")}
          </label>
          <input
            className="mb-3 w-full rounded-md border border-solid border-gray-600 p-3 dark:bg-[#1b252e]"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="description"
          >
            {t("exerciseDesc")}
          </label>
          <textarea
            className="mb-3 w-full rounded-md border border-solid border-gray-600 p-3 dark:bg-[#1b252e]"
            name="description"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

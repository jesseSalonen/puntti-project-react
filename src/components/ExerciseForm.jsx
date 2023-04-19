import { useState } from "react";
import { useDispatch } from "react-redux";
import { createExercise } from "../features/exercises/exerciseSlice";

function ExerciseForm() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExercise({ name }));
    setName("");
  };
  console.log("testi");
  return (
    <section className="max-sm:w-11/12 w-3/4 my-0 mx-auto">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="text-left block mt-0 mr-0 mb-1 ml-1" htmlFor="name">
            Exercise
          </label>
          <input
            className="w-full p-3 border border-solid border-gray-200 rounded-md mb-3"
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button
            className="
              py-3 
              px-5 
              border 
              border-solid 
              border-black 
              rounded-md 
              bg-black 
              text-white 
              text-base 
              font-bold 
              cursor-pointer 
              text-center 
              flex 
              items-center 
              justify-center 
              w-full 
              mb-5
              hover:scale-95
            "
            type="submit"
          >
            Add exercise
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExerciseForm;

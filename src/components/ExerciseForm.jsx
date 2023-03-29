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

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Exercise</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add exercise
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExerciseForm;

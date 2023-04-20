import { useDispatch } from "react-redux";
import { deleteExercise } from "../features/exercises/exerciseSlice";

function ExerciseItem({ exercise }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-50 my-3 mx-0 pt-5 pr-0 pb-3 relative">
      <div>{new Date(exercise.createdAt).toLocaleString()}</div>
      <h2>{exercise.name}</h2>
      <button
        onClick={() => dispatch(deleteExercise(exercise._id))}
        className="absolute top-3 right-4 cursor-pointer border-none bg-transparent"
      >
        X
      </button>
    </div>
  );
}

export default ExerciseItem;

import { useDispatch } from "react-redux";
import { deleteExercise } from "../features/exercises/exerciseSlice";
import CommonHelpers from "../helpers/CommonHelpers";

function ExerciseItem({ exercise }) {
  const dispatch = useDispatch();
  return (
    <div className="relative my-3 mx-0 bg-gray-100 pt-5 pr-0 pb-3 drop-shadow-md">
      <div>{CommonHelpers.getDateTimeText(new Date(exercise.createdAt))}</div>
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

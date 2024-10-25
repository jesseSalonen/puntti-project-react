import { useDispatch } from "react-redux";
import { deleteWorkout } from "../../features/workouts/workoutSlice";
import CommonHelpers from "../../helpers/CommonHelpers";

function WorkoutItem({ workout }) {
  const dispatch = useDispatch();
  return (
    <div className="relative my-3 mx-0 bg-gray-100 p-5 drop-shadow-lg dark:bg-gradient-to-br dark:from-[#18222A] dark:to-[#05121A]">
      <div>{CommonHelpers.getDateTimeText(new Date(workout.createdAt))}</div>
      <h2>{workout.name}</h2>
      <button
        onClick={() => dispatch(deleteWorkout(workout._id))}
        className="absolute top-3 right-4 cursor-pointer border-none bg-transparent"
      >
        X
      </button>
    </div>
  );
}

export default WorkoutItem;

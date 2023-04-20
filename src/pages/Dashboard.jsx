import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";
import Spinner from "../components/Spinner";
import { getExercises, reset } from "../features/exercises/exerciseSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isLoading, isError, message } = useSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getExercises());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="mb-12 py-0 px-5 text-4xl font-bold">
        <h1>Welcome {user && user.name}</h1>
        <p className="text-gray-400 max-sm:text-2xl">Exercise Dashboard</p>
      </section>
      <ExerciseForm />
      <section className="my-0 mx-auto w-3/4">
        {exercises.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise._id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <h3>You have not created any exercises</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";
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
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Exercise Dashboard</p>
      </section>
      <ExerciseForm />
    </>
  );
}

export default Dashboard;

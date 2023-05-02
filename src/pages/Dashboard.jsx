import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/exercises/ExerciseForm";
import ExerciseItem from "../components/exercises/ExerciseItem";
import Spinner from "../components/Spinner";
import { getExercises, reset } from "../features/exercises/exerciseSlice";
import { useTranslation } from "react-i18next";
import MobileSidebar from "../components/MobileSidebar";
import { toast } from "react-toastify";

function Dashboard() {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isLoading, isError, message } = useSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
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
      <section className="mb-12 py-0 px-5 font-bold">
        <h1 className="mb-4 flex items-center justify-center text-5xl max-sm:text-4xl">
          {t("welcome", { name: user && user.name })}
        </h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("dashboard")}
        </p>
      </section>
      <ExerciseForm />
      <section className="my-0 mx-auto w-3/4">
        {exercises.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise._id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <h3>{t("noExercises")}</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

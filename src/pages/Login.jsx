import { useEffect, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";
import { login, reset, selectAuth } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } =
    useSelector(selectAuth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email.toLowerCase(),
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <section className="mb-12 py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("login")}</h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("loginAndCreateExercises")}
        </p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3 dark:bg-[#1A242D] dark:border-[#2C3B48] dark:text-[#CFD7E5]"
              id="email"
              name="email"
              value={email}
              placeholder={t("enterEmail")}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3 dark:bg-[#1A242D] dark:border-[#2C3B48] dark:text-[#CFD7E5]"
              id="password"
              name="password"
              value={password}
              placeholder={t("enterPassword")}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="
                mb-5 
                flex 
                w-full 
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md 
                bg-gradient-to-r
                from-green-400
                to-green-500
                py-3 
                px-5 
                text-center 
                text-base 
                font-bold 
                text-green-800
                hover:scale-95
              "
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;

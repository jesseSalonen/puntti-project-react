import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";
import { register, reset, selectAuth } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const { t } = useTranslation("register");
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email: email.toLowerCase(),
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <section className="mb-12 py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t("register")}</h1>
        <p className="text-4xl text-gray-400 max-sm:text-2xl">
          {t("createAccount")}
        </p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
              id="name"
              name="name"
              value={name}
              placeholder={t("enterName")}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
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
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
              id="password"
              name="password"
              value={password}
              placeholder={t("enterPassword")}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="mb-3 w-full rounded-md border border-solid border-gray-200 p-3"
              id="password2"
              name="password2"
              value={password2}
              placeholder={t("confirmPassword")}
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
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;

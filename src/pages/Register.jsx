import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-4xl font-bold mb-12 py-0 px-5">
        <h1>
          <FaUser /> Register
        </h1>
        <p className="max-sm:text-2xl text-gray-400">
          Please create an account
        </p>
      </section>

      <section className="max-sm:w-11/12 w-3/4 my-0 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="w-full p-3 border border-solid border-gray-200 rounded-md mb-3"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-3 border border-solid border-gray-200 rounded-md mb-3"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-3 border border-solid border-gray-200 rounded-md mb-3"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-3 border border-solid border-gray-200 rounded-md mb-3"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
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
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;

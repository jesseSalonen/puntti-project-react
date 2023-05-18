import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createMuscle } from "../../features/muscles/muscleSlice";

function MuscleForm({ closeModal }) {
  const [name, setName] = useState("");
  const [upper, setUpper] = useState(true);
  const [push, setPush] = useState(true);
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();

  const toggleUpper = () => setUpper((prevUpper) => !prevUpper);

  const togglePush = () => setPush((prevPush) => !prevPush);

  const onSubmit = (e) => {
    e.preventDefault();

    const newMuscle = {
      name,
      upper: upper,
      lower: !upper,
      pushing: upper ? push : false,
      pulling: upper ? !push : false,
    };

    dispatch(createMuscle(newMuscle));
    clearFields();
    closeModal();
  };

  const clearFields = () => {
    setName("");
    setPush(true);
    setUpper(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center dark:text-white"
    >
      <div className="mb-3">
        <label className="mt-0 mr-0 mb-1 ml-1 block text-left" htmlFor="name">
          {t("name")}
        </label>
        <input
          className="w-full rounded-md border border-solid p-3 drop-shadow-md dark:border-gray-600 dark:bg-[#1b252e]"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        className="
        mb-3
        flex
        h-10
        w-4/5
        cursor-pointer
        items-center
        justify-between
        rounded-md
        bg-gray-300
        text-gray-700
        drop-shadow-md
        [&>p]:flex
        [&>p]:h-full
        [&>p]:w-full
        [&>p]:items-center
        [&>p]:justify-center
        [&>p]:p-1
        [&>p]:leading-5
      "
        onClick={toggleUpper}
      >
        <p className={`${upper ? "rounded-md bg-green-400" : ""}`}>
          {t("upper")}
        </p>
        <p className={`${!upper ? "rounded-md bg-green-400" : ""}`}>
          {t("lower")}
        </p>
      </div>
      {upper ? (
        <div
          className="
            mb-3
            flex
            h-10
            w-4/5
            cursor-pointer
            items-center
            justify-between
            rounded-md
            bg-gray-300
            text-gray-700
            drop-shadow-md
            [&>p]:flex
            [&>p]:h-full
            [&>p]:w-full
            [&>p]:items-center
            [&>p]:justify-center
            [&>p]:p-1
          "
          onClick={togglePush}
        >
          <p className={`${push ? "rounded-md bg-green-400" : ""}`}>
            {t("push")}
          </p>
          <p className={`${!push ? "rounded-md bg-green-400" : ""}`}>
            {t("pull")}
          </p>
        </div>
      ) : null}
      <div className="mb-3 mt-7">
        <button
          className="
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
          type="submit"
        >
          {t("addMuscle")}
        </button>
      </div>
    </form>
  );
}

export default MuscleForm;

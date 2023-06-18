import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectUserName } from "../features/auth/authSlice";

function Dashboard() {
  const { t } = useTranslation("dashboard");

  const userName = useSelector(selectUserName);

  return (
    <section className="mb-12 py-0 px-5 font-bold">
      <h1 className="mb-4 text-5xl max-sm:text-4xl">
        {t("welcome", { name: userName })}
      </h1>
      <p className="text-4xl text-gray-400 max-sm:text-2xl">
        {t("isWorkoutDone")}
      </p>
    </section>
  );
}

export default Dashboard;

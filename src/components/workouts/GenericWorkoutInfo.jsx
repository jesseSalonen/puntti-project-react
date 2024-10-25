import { useTranslation } from "react-i18next";

function GenericWorkoutInfo({ setName, name, setDescription, description }) {
  const { t } = useTranslation("dashboard");

  return (
    <div
      className="
        mb-5
        rounded-md
        border
        border-solid
        border-gray-200
        p-6
        drop-shadow-md
        dark:border-gray-600
        max-sm:p-2
      "
    >
      <div className="p-4">
        <div className="mb-3">
          <label className="mt-0 mr-0 mb-1 ml-1 block text-left" htmlFor="name">
            {t("name")}
          </label>
          <input
            className="w-full rounded-md border border-solid p-3 dark:border-gray-600 dark:bg-[#1b252e]"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            className="mt-0 mr-0 mb-1 ml-1 block text-left"
            htmlFor="description"
          >
            {t("desc")}
          </label>
          <textarea
            className="w-full rounded-md border border-solid p-3 dark:border-gray-600 dark:bg-[#1b252e]"
            name="description"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default GenericWorkoutInfo;

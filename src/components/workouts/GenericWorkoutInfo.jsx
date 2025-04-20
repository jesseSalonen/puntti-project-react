import { useTranslation } from "react-i18next";
import { FaDumbbell, FaEdit, FaAlignLeft } from "react-icons/fa";

function GenericWorkoutInfo({ setName, name, setDescription, description }) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center">
          <FaDumbbell className="text-green-500 mr-2" />
          <h3 className="text-xl font-bold">{t("workoutInfo")}</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5">
          <label 
            className="block text-left font-medium mb-2 text-gray-700 dark:text-gray-300" 
            htmlFor="name"
          >
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEdit className="text-green-500 dark:text-green-400 transition-colors duration-200" />
            </div>
            <input
              className="w-full rounded-md border border-gray-300 p-3 pl-10 bg-gray-50 shadow-sm transition-all 
                        focus:border-green-500 focus:ring-0 focus:shadow-md
                        group-hover:border-green-300
                        dark:border-gray-600 dark:bg-gray-700 dark:text-white
                        dark:focus:border-green-500 dark:group-hover:border-green-700"
              type="text"
              name="name"
              id="name"
              placeholder={t("enterWorkoutName")}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <div className="absolute inset-0 rounded-md pointer-events-none border border-transparent group-hover:border-green-300 dark:group-hover:border-green-700"></div>
          </div>
        </div>
        
        <div>
          <label
            className="block text-left font-medium mb-2 text-gray-700 dark:text-gray-300"
            htmlFor="description"
          >
            {t("desc")}
          </label>
          <div className="relative group">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FaAlignLeft className="text-green-500 dark:text-green-400 transition-colors duration-200" />
            </div>
            <textarea
              className="w-full rounded-md border border-gray-300 p-3 pl-10 bg-gray-50 shadow-sm transition-all 
                      focus:border-green-500 focus:ring-0 focus:shadow-md 
                      group-hover:border-green-300
                      dark:border-gray-600 dark:bg-gray-700 dark:text-white
                      dark:focus:border-green-500 dark:group-hover:border-green-700"
              name="description"
              id="description"
              rows="4"
              placeholder={t("enterWorkoutDesc")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute inset-0 rounded-md pointer-events-none border border-transparent group-hover:border-green-300 dark:group-hover:border-green-700"></div>
          </div>
        </div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-green-400 to-green-300"></div>
    </div>
  );
}

export default GenericWorkoutInfo;

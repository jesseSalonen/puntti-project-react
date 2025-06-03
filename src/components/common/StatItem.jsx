const StatItem = ({ icon: Icon, label, value, color = "text-gray-600" }) => (
  <div className="flex flex-1 items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50">
    <Icon className={`text-xl ${color}`} />
    <div className="whitespace-nowrap">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default StatItem;
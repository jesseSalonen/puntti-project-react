import React from 'react';
import {useTranslation} from 'react-i18next';
import ProgramList from '../../components/programs/ProgramList.jsx';
import RecentSessions from '../../components/workoutSessions/RecentSessions.jsx';

const StartWorkoutSession = () => {
  const { t } = useTranslation(["workoutSessions", "workouts", "common"]);

  return (
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-3/4">
      <div className="mb-6 flex flex-col items-center py-0 font-bold md:mb-12">
        <h1 className="mb-4 text-4xl md:text-5xl">{t("startWorkout", {ns: "common"})}</h1>
      </div>
      <RecentSessions />
    </div>
  );
};

export default StartWorkoutSession;

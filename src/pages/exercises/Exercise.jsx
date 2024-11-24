import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseFormFields from '../../components/exercises/ExerciseFormFields';
import Modal from '../../components/Modal';
import { getExercise, reset, selectExercises, updateExercise } from '../../features/exercises/exerciseSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/common/Spinner';
import MuscleForm from '../../components/exercises/MuscleForm';

function Exercise() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [exerciseMuscles, setExerciseMuscles] = useState([]);
  const [addMuscleModalOpen, setAddMuscleModalOpen] = useState(false);

  const { t } = useTranslation(['dashboard', 'exercises']);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentExercise, isLoading, isError, isSuccess, message } = useSelector(selectExercises);

  useEffect(() => {
    dispatch(getExercise(id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('exerciseUpdated', { ns: 'exercises' }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (currentExercise) {
      setName(currentExercise.name);
      setDescription(currentExercise.description);
      setExerciseMuscles(currentExercise.muscles.map(muscle => muscle._id));
    }
  }, [currentExercise]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateExercise({
        id,
        exerciseData: { name, description, exerciseMuscles },
      }),
    );
  };

  const closeAddMuscleModal = () => {
    setAddMuscleModalOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <section>
        <form onSubmit={onSubmit}>
          <ExerciseFormFields
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            exerciseMuscles={exerciseMuscles}
            setExerciseMuscles={setExerciseMuscles}
            setAddMuscleModalOpen={setAddMuscleModalOpen}
          />
          <div className="mb-3">
            <button
              className="mb-5 flex w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-green-500 py-3 px-5 text-center text-base font-bold text-green-800 hover:scale-95"
              type="submit"
            >
              {t('editExercise')}
            </button>
          </div>
        </form>
        <Modal
          isOpen={addMuscleModalOpen}
          closeModal={closeAddMuscleModal}
          title={t('muscleInfo')}
        >
          <MuscleForm closeModal={closeAddMuscleModal} />
        </Modal>
      </section>
    </div>
  );
}

export default Exercise;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise, reset, selectExercises } from '../../features/exercises/exerciseSlice';
import MuscleForm from '../../components/exercises/MuscleForm';
import Modal from '../../components/Modal';
import ExerciseFormFields from '../../components/exercises/ExerciseFormFields';
import { toast } from 'react-toastify';
import Spinner from '../../components/common/Spinner';

function AddExercise() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [exerciseMuscles, setExerciseMuscles] = useState([]);
  const [addMuscleModalOpen, setAddMuscleModalOpen] = useState(false);

  const { t } = useTranslation(['dashboard', 'exercises']);

  const { isLoading, isError, isSuccess, message } = useSelector(selectExercises);
  const dispatch = useDispatch();

  useEffect(() => {
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
      toast.success(t('exerciseAdded', { ns: 'exercises' }));
      clearFields();
    }
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExercise({ name, description, exerciseMuscles }));
  };

  const clearFields = () => {
    setName('');
    setDescription('');
    setExerciseMuscles([]);
  };

  const closeAddMuscleModal = () => {
    setAddMuscleModalOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto w-3/4 max-sm:w-11/12">
      <div className="mb-12 flex flex-col items-center py-0 font-bold">
        <h1 className="mb-4 text-5xl max-sm:text-4xl">{t('addExercise')}</h1>
        <p className="text-center text-4xl text-gray-400 max-sm:text-2xl">
          {t('addExercisesFromBelow', { ns: 'exercises' })}
        </p>
      </div>
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
            {t('addExercise')}
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

export default AddExercise;

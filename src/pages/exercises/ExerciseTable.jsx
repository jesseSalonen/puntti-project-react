import React, { useMemo, useState, useEffect } from 'react';
import CommonHelpers from '../../helpers/CommonHelpers';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  reset,
  selectExercises,
} from "../../features/exercises/exerciseSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/common/Spinner";
import ReactTable from '../../components/common/ReactTable';

const ExerciseTable = () => {
  const { t } = useTranslation('exercises');
  const dispatch = useDispatch();

  const { exercises, isLoading, isError, message } =
    useSelector(selectExercises);

  useEffect(() => {
    dispatch(getExercises());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('exerciseName'),
        sortingFn: CommonHelpers.fuzzySort,
      },
      {
        accessorKey: 'createdAt',
        header: t('createdAt'),
        cell: ({ getValue }) =>
          CommonHelpers.getDateTimeText(new Date(getValue())),
      },
      {
        id: 'actionButtons',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link to={`/exercises/${row.original._id}`}>
              <button
                className="
                  my-1 
                  flex
                  cursor-pointer 
                  items-center 
                  justify-center 
                  rounded-md
                  border-2
                  border-green-300 
                  py-2
                  px-4
                  text-center 
                  text-black
                  hover:bg-green-400/30
                "
              >
                <FaEdit />
              </button>
            </Link>
            <button
              className="
                my-1 
                flex
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md
                bg-green-300 
                py-2
                px-4
                text-center 
                text-black
                hover:bg-green-400
              "
            >
              <FaPlus />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const tableData = useMemo(() => ({ rows: exercises, columns }), [exercises]);

  if (isLoading) {
    return <Spinner />;
  }

  return <ReactTable tableData={tableData} />;
};

export default ExerciseTable;

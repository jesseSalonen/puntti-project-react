import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
} from '@tanstack/react-table';
import CommonHelpers from '../../helpers/CommonHelpers';
import { useTranslation } from 'react-i18next';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';
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

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const ExerciseTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');

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

  // Set default column properties
  const defaultColumn = useMemo(
    () => ({
      filterFn: 'includesString',
    }),
    [],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('exerciseName'),
        sortingFn: fuzzySort,
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

  const tableData = useMemo(() => exercises, [exercises]);

  const table = useReactTable({
    data: tableData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block mb-4 w-full border p-2 shadow"
          placeholder={t('exerciseSearch')}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border p-2 text-left"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} t={t} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="border p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1 hover:bg-gray-200"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="rounded border p-1 hover:bg-gray-200"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className="flex items-center gap-1">
          <div>{t('page', { ns: 'common' })}</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}{' '}
            {t('of', { ns: 'common' })} {table.getPageCount()}
          </strong>
        </span>
        <button
          className="rounded border p-1 hover:bg-gray-200"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="rounded border p-1 hover:bg-gray-200"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          | {t('goToPage', { ns: 'common' })}:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded border p-1"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t('show', { ns: 'common' })} {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        {table.getPrePaginationRowModel().rows.length}{' '}
        {t('rows', { ns: 'common' })}
      </div>
    </div>
  );
};

function Filter({ column, t }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={columnFilterValue ?? ''}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={t('search', { ns: 'common' })}
      className="w-36 rounded border shadow"
    />
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default ExerciseTable;

import React, { useState, useEffect } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useTranslation } from 'react-i18next';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableDebouncedInput from './TableDebouncedInput';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

function ReactTable({ tableData }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const { t } = useTranslation(['exercises', 'common']);

  const table = useReactTable({
    data: tableData.rows,
    columns: tableData.columns,
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
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <div>
        <TableDebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block mb-4 w-full border p-2 shadow"
          placeholder={t('exerciseSearch')}
        />
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse bg-white shadow-md">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>
      <TableFooter table={table} />
    </div>
  );
}

export default ReactTable;

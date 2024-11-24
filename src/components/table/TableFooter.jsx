import React from 'react';
import { useTranslation } from 'react-i18next';

function TableFooter({ table }) {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex items-center flex-wrap gap-2">
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
          <div>{t('page')}</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}{' '}
            {t('of')} {table.getPageCount()}
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
          {t('goToPage')}:
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
              {t('show')} {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        {table.getPrePaginationRowModel().rows.length}{' '}
        {t('rows')}
      </div>
    </>
  );
}

export default TableFooter;

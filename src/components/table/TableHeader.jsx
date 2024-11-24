import React from 'react';
import { useTranslation } from 'react-i18next';
import TableDebouncedInput from './TableDebouncedInput';
import { flexRender } from '@tanstack/react-table';

function TableHeader({ table }) {
  const { t } = useTranslation(['exercises', 'common']);

  return (
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
  );
}

function Filter({ column, t }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <TableDebouncedInput
      type="text"
      value={columnFilterValue ?? ''}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={t('search', { ns: 'common' })}
      className="w-36 rounded border shadow"
    />
  );
}

export default TableHeader;

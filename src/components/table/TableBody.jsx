import React from 'react';
import { flexRender } from '@tanstack/react-table';

function TableBody({ table }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;

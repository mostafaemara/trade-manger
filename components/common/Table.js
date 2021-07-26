import React from "react";
import { Table as UiTable } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
function Table({
  getTableProps,
  headerGroups,
  page,
  getTableBodyProps,
  prepareRow,
}) {
  console.log("Table", headerGroups);
  return (
    <div>
      <UiTable
        size='sm'
        responsive='sm'
        bordered
        hover
        variant='outline-dark'
        {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup}
              className='table-primary'
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </UiTable>
    </div>
  );
}

export default Table;

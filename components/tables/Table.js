import React from "react";
import "bootstrap/dist/css/bootstrap.css";
function Table({
  getTableProps,
  headerGroups,
  page,
  getTableBodyProps,
  prepareRow,
}) {
  return (
    <div>
      <table className='table table-bordered' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroups}
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
      </table>
    </div>
  );
}

export default Table;

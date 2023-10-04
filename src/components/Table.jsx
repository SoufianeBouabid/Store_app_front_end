import React from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";

MyTable.propTypes = {
  data: PropTypes.array.isRequired, // Expecting data to be an array
};

function MyTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Row Number",
        accessor: (row, index) => index + 1, // Generate row numbers
      },
      {
        Header: "Name",
        accessor: "name", // Access the 'name' property from your data
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th key={columnIndex} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, rowIndex) => {
                return (
                  <td key={rowIndex} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MyTable;

import React from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";

MyTable.propTypes = {
  data: PropTypes.array.isRequired,
};

function MyTable({ data, mutate }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => {
          // console.log(row.original);
          return (
            <button
              onClick={() => {
                handleDelete(row.original);
                setTimeout(() => {
                  mutate();
                }, 500);
              }}
            >
              Delete
            </button>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleDelete = (transformedData) => {
    //Receive the user object
    const rowId = transformedData.id; // Access the 'id' property from the user object
    console.log(rowId);
    let access_token = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    fetch(`http://localhost:5000/user/${rowId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
        withCredentials: true,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle successful deletion or error response
        console.log("User deleted:", data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // console.log("Delete button clicked for row:", row);

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

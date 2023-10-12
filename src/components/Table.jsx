import React from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";
import { useState } from "react";
import { useCallback } from "react";
import Modal from "./Modal";

MyTable.propTypes = {
  data: PropTypes.array.isRequired,
  mutate: PropTypes.func,
  row: PropTypes.array,
};

function MyTable({ data, mutate }) {
  const [username, setUsername] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
        Header: "Deletion",
        accessor: "deletion",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => {
                memoizedHandleDelete(row.original);
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
      {
        Header: "Update",
        accessor: "update",
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => {
                  setUsername(row.original.name);
                  setPwd("");
                  setSelectedId(row.original.id);
                  setIsOpen(true);
                }}
              >
                Update
              </button>
              {
                <Modal
                  username={username}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  pwd={pwd}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  mutate={mutate}
                />
              }
            </>
          );
        },
      },
    ],
    [isOpen, mutate] //add memoizedHandleDelete
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const memoizedHandleDelete = useCallback((user) => {
    const rowId = user.id;

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
      .then(() => {
        if (mutate) {
          setTimeout(() => {
            mutate();
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
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
          {rows?.map((row, index) => {
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
    </>
  );
}

export default MyTable;

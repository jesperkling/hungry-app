import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/Authentication";
import { useTable, useSortBy } from "react-table";
import { Container, Table } from "react-bootstrap";

function AdminPage() {
  const [data, setData] = useState([]);
  const { getAllUsers } = useAuthContext();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        sortType: (a, b) => {
          if (typeof a === "string" && typeof b === "string") {
            return a.toLowerCase().localeCompare(b.toLowerCase());
          } else {
            return 0;
          }
        },
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Admin",
        accessor: (d) => (d.admin ? "Yes" : "No"),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers();
      console.log(users);
      if (users) {
        const userData = users.map((users) => ({
          name: users.name,
          email: users.email,
          admin: users.admin,
        }));
        setData(userData);
      }
    }
    fetchData();
  }, [getAllUsers]);

  return (
    <Container>
      <h1 className="text-center">Admin Page</h1>
      <Table className="" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPage;

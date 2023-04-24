import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup, Table } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/index";
import { useTable, useSortBy } from "react-table";

function RestaurantsPage() {
  const [places, setPlaces] = useState([]);
  const data = React.useMemo(() => places, [places]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Namn",
        accessor: "namn",
        Cell: ({ row }) => (
          <Link
            to={{
              pathname: `/places/${row.original.id}`,
              search: `name=${row.original.namn}`,
            }}
          >
            {row.original.namn}
          </Link>
        ),
      },
      {
        Header: "Typ",
        accessor: "typ",
      },
      {
        Header: "Utbud",
        accessor: "utbud",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    async function getPlaces() {
      const placesRef = collection(database, "places");
      const snapshots = await getDocs(placesRef);
      const places = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(places);
    }
    getPlaces();
  }, []);

  return (
    <Container>
      <h1>Matställen</h1>
      <Table {...getTableProps()}>
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

export default RestaurantsPage;

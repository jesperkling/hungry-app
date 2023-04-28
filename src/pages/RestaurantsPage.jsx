import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import useGetAllPlaces from "../hooks/useGetAllPlaces";
import SortableTable from "../components/SortableTable";

function RestaurantsPage() {
  const { data: places, isLoading } = useGetAllPlaces("places");

  const columns = useMemo(
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

  return (
    <Container>
      <h1>Matställen</h1>
      {isLoading && <p>Laddar...</p>}
      {places && <SortableTable columns={columns} data={places} />}
    </Container>
  );
}

export default RestaurantsPage;

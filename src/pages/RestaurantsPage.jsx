import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/index";
import SortableTable from "../components/SortableTable";

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
      <SortableTable columns={columns} data={data} />
    </Container>
  );
}

export default RestaurantsPage;

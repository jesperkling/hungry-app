import React, { useState, useEffect, useMemo } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import { collection, getDocs } from "@firebase/firestore";
import { database } from "../firebase";
import { AiFillEdit } from "react-icons/ai";
import SortableTable from "../components/SortableTable";

function EditPage() {
  const [createPlace, setCreatePlace] = useState(false);
  const [editPlace, setEditPlace] = useState(false);
  const [places, setPlaces] = useState([]);
  const data = useMemo(() => places, [places]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "edit",
        Cell: ({ row }) =>
          row.id ? (
            <Link to={`/admin/edit/${row.original.id}`}>
              <AiFillEdit />
            </Link>
          ) : null,
      },
      {
        Header: "Namn",
        accessor: "namn",
      },
      {
        Header: "Gatuadress",
        accessor: "gatuadress",
      },
      {
        Header: "Ort",
        accessor: "ort",
      },
      {
        Header: "Typ",
        accessor: "typ",
      },
    ],
    []
  );

  const handleCreatePlace = () => {
    setCreatePlace(true);
    setEditPlace(false);
  };

  const handleEditPlace = () => {
    setEditPlace(true);
    setCreatePlace(false);
  };

  useEffect(() => {
    const getPlaces = async () => {
      const placesCollection = collection(database, "places");
      const placesSnapshot = await getDocs(placesCollection);
      const placesList = placesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(placesList);
    };
    getPlaces();
  }, []);

  return (
    <div className="text-center" style={{ height: "800px", overflowY: "auto" }}>
      <Container>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleCreatePlace} className="m-2">
          Skapa nytt matställe
        </Button>
        <Button onClick={handleEditPlace} className="m-2">
          Redigera matställe
        </Button>
        {createPlace && (
          <div className="text-center">
            <h1>Skapa nytt matställe</h1>
            <CreateForm />
          </div>
        )}

        {editPlace && (
          <div className="text-center">
            <h1>Redigera matställe</h1>
            <SortableTable columns={columns} data={data} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditPage;

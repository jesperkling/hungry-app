import React, { useState, useMemo, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import SortableTable from "../components/SortableTable";
import useGetAllPlaces from "../hooks/useGetAllPlaces";
import UserForm from "../components/UserForm";
import useGetTips from "../hooks/useGetTips";
import EditTipsForm from "../components/EditTipsForm";
import { database } from "../firebase/index";
import { doc, deleteDoc } from "firebase/firestore";

function AdminPage() {
  const [createPlace, setCreatePlace] = useState(false);
  const [editPlace, setEditPlace] = useState(false);
  const [userList, setUserList] = useState(false);
  const [editTips, setEditTips] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const { data: places, isLoading } = useGetAllPlaces("places");
  const { data: tips } = useGetTips("tips");

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
        Header: "",
        accessor: "delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDeleteTip(row.original.id)}>
            <AiFillDelete />
          </button>
        ),
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
    setCreatePlace(!createPlace);
    setEditPlace(false);
    setUserList(false);
    setEditTips(false);
  };

  const handleEditPlace = () => {
    setEditPlace(!editPlace);
    setCreatePlace(false);
    setUserList(false);
    setEditTips(false);
  };

  const handleUserList = () => {
    setUserList(!userList);
    setEditPlace(false);
    setCreatePlace(false);
    setEditTips(false);
  };

  const handleEditTips = () => {
    setEditTips(!editTips);
    setEditPlace(false);
    setCreatePlace(false);
    setUserList(false);
  };

  const handleDeleteTip = async (tipsId) => {
    await deleteDoc(doc(database, "tips", tipsId));
  };

  const handleSelectTips = (tip) => {
    setSelectedTip(tip);
  };

  const onTipsUpdated = () => {
    setSelectedTip(null);
  };

  return (
    <div style={{ height: "800px", overflowY: "auto" }}>
      <Container>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleUserList} className="m-2">
          Användarlista
        </Button>
        <Button onClick={handleCreatePlace} className="m-2">
          Skapa nytt matställe
        </Button>
        <Button onClick={handleEditPlace} className="m-2">
          Redigera matställe
        </Button>
        <Button onClick={handleEditTips} className="m-2">
          Se tips
        </Button>

        {editTips && (
          <>
            <h3>Senaste Tipsen</h3>
            {tips && (
              <SortableTable
                columns={[
                  {
                    Header: "",
                    accessor: "edit",
                    Cell: ({ row }) =>
                      row.id ? (
                        <button onClick={() => handleSelectTips(row.original)}>
                          <AiFillEdit />
                        </button>
                      ) : null,
                  },
                  {
                    Header: "",
                    accessor: "delete",
                    Cell: ({ row }) => (
                      <button onClick={() => handleDeleteTip(row.original.id)}>
                        <AiFillDelete />
                      </button>
                    ),
                  },
                  {
                    Header: "Name",
                    accessor: "namn",
                  },
                  {
                    Header: "Email",
                    accessor: "email",
                  },
                  {
                    Header: "Tips",
                    accessor: "tips",
                  },
                ]}
                data={tips}
              />
            )}
            {selectedTip && (
              <EditTipsForm
                selectedTip={selectedTip}
                tips={tips}
                onTipsUpdated={onTipsUpdated}
              />
            )}
          </>
        )}

        {userList && <UserForm />}

        {createPlace && (
          <div className="text-center">
            <h1>Skapa nytt matställe</h1>
            <CreateForm />
          </div>
        )}

        {editPlace && (
          <div className="text-center">
            <h1>Redigera matställe</h1>
            {isLoading && <p>Laddar...</p>}
            {places && <SortableTable columns={columns} data={places} />}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AdminPage;

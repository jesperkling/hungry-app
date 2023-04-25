import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import CreateForm from "../components/CreateForm";

function EditPage() {
  const [createPlace, setCreatePlace] = useState(false);
  const [editPlace, setEditPlace] = useState(false);

  const handleCreatePlace = () => {
    setCreatePlace(true);
    setEditPlace(false);
  };

  const handleEditPlace = () => {
    setEditPlace(true);
    setCreatePlace(false);
  };

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
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditPage;

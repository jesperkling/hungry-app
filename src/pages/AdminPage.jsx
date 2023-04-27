import React, { useEffect, useState, useMemo } from "react";
import { useAuthContext } from "../contexts/Authentication";
import { Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import SortableTable from "../components/SortableTable";

function AdminPage() {
  const [data, setData] = useState([]);
  const { getAllUsers } = useAuthContext();
  const columns = useMemo(
    () => [
      {
        Header: "Profile Picture",
        accessor: "profilePicture",
        Cell: ({ cell: { value } }) => (
          <div>
            {value ? (
              <img
                src={value}
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <FaUserCircle size={32} />
            )}
          </div>
        ),
      },
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

  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers();
      console.log(users);
      if (users) {
        const userData = users.map((users) => ({
          profilePicture: users.photoURL,
          name: users.name,
          email: users.email,
          admin: users.admin,
        }));
        setData(userData);
        console.log(userData);
      }
    }
    fetchData();
  }, [getAllUsers]);

  return (
    <Container>
      <h1 className="text-center">Admin Page</h1>
      <SortableTable columns={columns} data={data} />
    </Container>
  );
}

export default AdminPage;

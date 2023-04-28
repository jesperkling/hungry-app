import React, { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import SortableTable from "../components/SortableTable";
import useGetUsers from "../hooks/useGetUsers";

const UserForm = () => {
  const { data: users, isLoading } = useGetUsers("users");

  const columns = useMemo(
    () => [
      {
        Header: "Profile Picture",
        accessor: "photoURL",
        Cell: (tableProps) => (
          <>
            {tableProps.row.original.photoURL ? (
              <img
                src={tableProps.row.original.photoURL}
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <FaUserCircle size={32} />
            )}
          </>
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
  return (
    <div>
      <h1 className="text-center">Admin Page</h1>
      {isLoading && <p>Laddar...</p>}
      <SortableTable columns={columns} data={users} />
    </div>
  );
};

export default UserForm;

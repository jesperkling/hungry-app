import React from "react";
import { useAuthContext } from "../contexts/Authentication";

function AdminPage() {
  const { currentUser, admin } = useAuthContext();
  console.log(admin);
  console.log(currentUser);
  return <div>Welcome admin</div>;
}

export default AdminPage;

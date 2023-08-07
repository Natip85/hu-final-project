import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import AdminMenu from "./AdminMenu";

type Props = {};

const AdminDashboard = (props: Props) => {
  const { userData } = useContext(UserContext);
  return (
    <Container className="d-flex">
      <div className="col-md-3 me-5">
        <AdminMenu />
      </div>
      <div className="card w-75 p-3">
        <h3>Admin Name: {userData?.user.firstName}</h3>
        <h3>Admin Email: {userData?.user.email}</h3>
        <h3>Admin Contact: {userData?.user.phone}</h3>
      </div>
    </Container>
  );
};

export default AdminDashboard;

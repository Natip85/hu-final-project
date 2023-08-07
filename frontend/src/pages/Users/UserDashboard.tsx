import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import UserMenu from "./UserMenu";

type Props = {};

const UserDashboard = (props: Props) => {
  const { userData } = useContext(UserContext);
  return (
    <Container className="d-flex">
      <div className="col-md-3 me-5">
        <UserMenu />
      </div>

      <div className="card w-75 p-3">
        <h3>Name: {userData?.user.firstName}</h3>
        <h3>Email: {userData?.user.email}</h3>
        <h3>Contact: {userData?.user.phone}</h3>
      </div>
    </Container>
  );
};

export default UserDashboard;

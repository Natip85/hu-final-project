import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import AdminMenu from "./AdminMenu";
import { getAllUsers, getItems } from "../../services/apiServices";
import { User } from "../../interfaces/UserType";
import { Item } from "../../interfaces/ItemType";

type Props = {};

const AdminDashboard = (props: Props) => {
  const { userData } = useContext(UserContext);
 const [users, setUsers] = useState<Array<User>>([]);
 const [allItems, setAllItems] = useState<Array<Item>>([]);
 
    useEffect(() => {
    getUsers();
    getAllProducts()
  }, []);

  const getUsers = async () => {
    await getAllUsers().then((json) => {
      setUsers(json);
    });
  };
  
  async function getAllProducts() {
    await getItems().then((json) => {
      setAllItems(json);
    });
  }


  return (
    <Container className="d-flex">
      <div className="col-md-3 me-5">
        <AdminMenu />
      </div>
      <div className="card w-50 p-3">
        <h3>Total users:  {users.length}</h3>
        <h3>Total products: {allItems.length}</h3>
        <h3>Total categories: {allItems.length}</h3>
        
      </div>
    </Container>
  );
};

export default AdminDashboard;

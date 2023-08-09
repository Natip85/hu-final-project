import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import AdminMenu from "./AdminMenu";
import { deleteUser, getAllUsers } from "../../services/apiServices";
import { User } from "../../interfaces/UserType";
import { SearchContext } from "../../context/SearchContext";
import toast from 'react-hot-toast'

type Props = {};

const Users = (props: Props) => {
  const [users, setUsers] = useState<Array<User>>([]);
    const { searchValue } = useContext(SearchContext);
     const [filteredItems, setFilteredItems] = useState<Array<User>>([]);
    
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await getAllUsers().then((json) => {
      setUsers(json);
    });
  };

   useEffect(() => {
    const filtered = users.filter(
      (item) =>
        item.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchValue, users]);

   const handleDelete = async (id: string) => {
    let answer = window.confirm("Are you sure you want to delete this user?");
    if (!answer) return;
    await deleteUser(id).then((json) => {
      if (json.success) {
        toast.success(`${json.message}`);
        getUsers();
      } else {
        toast.error(`${json.message}`);
      }
    });
  };

  return (
    <Container className="d-flex">
      <div className="col-md-3 p-0 me-5">
        <AdminMenu />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Blocked</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((c) => (
            <tr key={c._id}>
              <td>{c.role ? "Administrator" : "User"}</td>
              <td>{c.firstName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>{JSON.stringify(c.isBlocked)}</td>
              <td style={{width: '150px'}}>
                <Button
                  variant="sm"
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    // setVisible(true);
                    // setUpdatedName(c.name);
                    // setUpdatedCatImg(c.catImg);
                    // setSelected(c._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="sm"
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    handleDelete(c._id as string);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Users;

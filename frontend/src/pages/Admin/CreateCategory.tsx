import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/apiServices";
import { Category } from "../../interfaces/CategoryType";
import { Modal } from "antd";
import { Container } from "react-bootstrap";
type Props = {};

const CreateCategory = (props: Props) => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    createCategory({
      name,
    }).then((json) => {
      if (json.success) {
        toast.success(`${name} was created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(`${json.message}`);
      }
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    updateCategory(selected, { name: updatedName }).then((json) => {
      if (json.success) {
        toast.success(`${updatedName} was updated`);
        setSelected("");
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(`${json.message}`);
      }
    });
  };

  const handleDelete = async (pid: string) => {
    let answer = window.confirm("Are you sure you want to delete this product");
    if (!answer) return;
    await deleteCategory(pid).then((json) => {
      if (json.success) {
        toast.success(`${json.message}`);
        getAllCategories();
      } else {
        toast.error(`${json.message}`);
      }
    });
  };

  return (
    <Container>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-0">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex flex-column align-items-center">
            <h1>Manage Categories</h1>
            <div className="p-3 w-75 mb-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Add new category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c: any) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);

                            setSelected(c._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <form className="w-75" onSubmit={handleUpdate}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Add new category"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateCategory;

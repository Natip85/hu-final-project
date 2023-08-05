import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { addItem, deleteItem, getItems } from "../../services/apiServices";
import { Item } from "../../interfaces/ItemType";
import { Modal } from "antd";
import toast from 'react-hot-toast'
import { formatCurrency } from "../../utilities/FormatCurrency";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import AdminMenu from "./AdminMenu";
import { SearchContext } from "../../context/SearchContext";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<Item>>([]);
  const [visible, setVisible] = useState(false);
  const { searchValue } = useContext(SearchContext);
  const [filteredItems, setFilteredItems] = useState<Array<Item>>([]);

  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchValue, products]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    await getItems().then((json) => {
      setProducts(json);
    });
  };

  async function handleSubmit(item: Item) {
    await addItem(item).then((json) => {
      if (!json.success) {
        toast.error(`${json.message}`);
      } else {
        getAllProducts();
        toast.success(`Product created`);
        setVisible(false);
      }
    });
  }

  async function handleDelete(pid: string) {
    let answer = window.confirm("Are you sure you want to delete this product");
    if (!answer) return;
    await deleteItem(pid).then((json) => {
      getAllProducts();
      toast.success(`${json.message}`);
    });
  }

  return (
    <Container className="d-flex">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <ProductForm handleSubmit={handleSubmit} />
      </Modal>
      <Container>
        <Container className="d-flex justify-content-end">
          <Button
            className="mb-5"
            variant="success"
            onClick={() => {
              setVisible(true);
            }}
          >
            + Add a Product
          </Button>
        </Container>
        <Row md={2} xs={1} lg={3} className="g-3">
          {filteredItems.map((item) => (
            <Col key={item._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={item.photo}
                  height="200px"
                  style={{ objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-4">{item.name}</span>
                    <br />
                    <span className="ms-2 text-muted">
                      {formatCurrency(item.price as number)}
                    </span>
                  </Card.Title>
                  <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-5">
                      {item.description?.substring(0, 30)}...
                    </span>
                  </Card.Title>
                  <Card.Title>
                    <span className="fs-6">
                      Shipping: {JSON.stringify(item.shipping) ? "Yes" : "No"}
                    </span>
                  </Card.Title>
                  <Card.Title>
                    <span className="fs-6">
                      Category: {JSON.stringify(item.category.name)}
                    </span>
                  </Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    onClick={() => {
                      navigate(`/dashboard/admin/products/${item.slug}`);
                    }}
                    className=""
                    variant="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id as string)}
                    className=""
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Products;

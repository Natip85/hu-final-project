import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../interfaces/CategoryType";
import { getCategories } from "../services/apiServices";

type Props = {};

const Categories = (props: Props) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }

  return (
    <Container>
      <h2 className="text-center mb-5">Shop by Category</h2>
      <Button onClick={()=>navigate(-1)} className="mb-5">Back</Button>
       <Row className="g-3 ms-3 w-100 my-5">
        {categories.map((c) => (
          <Col className="d-flex flex-column align-items-center" key={c._id} lg={3}>
            <Link
              className=""
              to={`/category/${c.slug}`}
            >
              <img style={{width: '200px'}} src={c.catImg} alt="" />
             
            </Link>
        {c.name}
         </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;

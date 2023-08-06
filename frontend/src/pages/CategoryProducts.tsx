import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getItemCategory } from "../services/apiServices";
import { Item } from "../interfaces/ItemType";
import { useShoppingCart } from "../context/ShoppingCartContext";
import toast from 'react-hot-toast'


const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<Item>>([]);
   const { increaseCartQuantity} = useShoppingCart()
   
  useEffect(() => {
    if (params.slug) getProductByCat();
  }, [params.slug]);

  const getProductByCat = async () => {
    if (!params) return;
    await getItemCategory(params.slug as string).then((json) => {
      setProducts(json);
    });
  };

  return (
    <Container>
      <h5 className="text-center text-success">
        {products.length} results found
      </h5>
      <div>
        <Button onClick={()=>navigate(-1)} className="mb-5">Back</Button>
      </div>
      <div className="row">
        <div className="d-flex flex-wrap">
          {products.map((p) => (
            <div
              key={p._id}
              className="card m-2 h-100"
              style={{ width: "20rem" }}
            >
              <img
                src={p.photo}
                className="card-img-top"
                alt={p.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">${p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  See details
                </button>
                <button className="btn btn-secondary ms-1" onClick={()=>{
                  increaseCartQuantity(p._id as string)
                  toast.success(`${p.name} added to cart`)
                }}
                >
                  Add to cart
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategoryProducts;

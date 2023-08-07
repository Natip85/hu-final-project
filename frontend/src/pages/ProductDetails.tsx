import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSimiliarItem, getSingleItem } from "../services/apiServices";
import { Item } from "../interfaces/ItemType";
import { Button, Container } from "react-bootstrap";
import { formatCurrency } from "../utilities/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import toast from 'react-hot-toast'

type Props = {};

const ProductDetails = (props: Props) => {
  const navigate = useNavigate()
  const params = useParams();
  const [product, setProduct] = useState<Item>();
  const [relatedProducts, setRelatedProducts] = useState<Array<Item>>([]);
  const { increaseCartQuantity } = useShoppingCart();

  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    if (!params.slug) return;
    await getSingleItem(params.slug).then((json) => {
      setProduct(json);
      getSimiliarProducts(json._id as string, json.category._id as string);
    });
  };

  const getSimiliarProducts = async (pid: string, cid: string) => {
    await getSimiliarItem(pid as string, cid as string).then((json) => {
      setRelatedProducts(json);
    });
  };

  return (
    <>
      <Container className="d-flex flex-column">
        <Button className="w-25 mb-5" variant="outline-primary" onClick={()=>navigate(-1)}>back</Button>
        <Container className="d-flex">
          <Container className="w-50">
            <img className="w-100" src={product?.photo} alt="product-pic" />
          </Container>
          <Container className="w-50 py-5">
            <h2>{product?.name}</h2>
            <hr
              className="w-25 my-5"
              style={{
                height: "5px",
                backgroundColor: "black",
                opacity: "100%",
              }}
            />
            <span>{formatCurrency(product?.price as number)}</span>
            <p className="mt-3">{product?.description}</p>
            <div className="d-flex justify-content-between pe-5 mb-5">
              Quantity
              <span>{product?.quantity}</span>
            </div>

            <div>
              <Button
                onClick={() => {
                  increaseCartQuantity(product?._id as string);
                  toast.success(`${product?.name} added to cart`);
                }}
                variant="outline-dark"
                className="w-100"
              >
                ADD TO CART
              </Button>
            </div>
          </Container>
        </Container>
        <Container>
          <h4 className="my-4">Related products</h4>
          {relatedProducts.length < 1 && (
            <div>No related products to display</div>
          )}
          {relatedProducts.map((related) => (
              <img style={{width: '150px', margin: 5}} src={related.photo} alt="related-images" />
          ))}
        </Container>
      </Container>
    </>
  );
};

export default ProductDetails;

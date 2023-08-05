import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartPageItem from "./CartPageItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/FormatCurrency";
import { Item } from "../interfaces/ItemType";
import { getItems } from "../services/apiServices";

type Props = {};

const CartPage = (props: Props) => {
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();
  const [products, setProducts] = useState<Array<Item>>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    await getItems().then((json) => {
      setProducts(json);
    });
  };

  return (
    <Container className="w-50 m-0">
      {cartItems.length < 1 && (
        <div className="text-center">No items in cart</div>
      )}
      {cartItems.map((item) => (
        <>
          <CartPageItem key={item.id} {...item} />
          <hr
            style={{
              width: "100%",
              color: "black",
              height: "2px",
              opacity: "100%",
            }}
          />
        </>
      ))}
      {cartItems.length > 0 && (
        <div className="ms-auto fw-bold fs-5">
          Total{" "} ({cartItems.length} items) {" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = products.find((i) => i._id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
      )}
        <Button
        variant="outline-success"
        className="my-5"
        onClick={() => navigate("/")}
      >
        CONTINUE SHOPPING
      </Button>
    </Container>
  );
};

export default CartPage;

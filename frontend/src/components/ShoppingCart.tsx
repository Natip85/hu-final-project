import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/FormatCurrency";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { Item } from "../interfaces/ItemType";
import { getItems } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const navigate = useNavigate()
  const { closeCart, cartItems } = useShoppingCart();
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
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="d-flex justify-content-between flex-column">
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find((i) => i._id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
            <div>
              <div className="my-4">
                <Button
                  className="w-100"
                  variant="warning"
                  onClick={() => {
                    closeCart()
                    navigate("/cart")
                  }}
                >
                  GO TO CART
                </Button>
              </div>
            </div>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;

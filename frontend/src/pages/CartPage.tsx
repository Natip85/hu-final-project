import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartPageItem from "./CartPageItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/FormatCurrency";
import { Item } from "../interfaces/ItemType";
import { getItems } from "../services/apiServices";
import { UserContext } from "../context/userContext";

type Props = {};

const CartPage = (props: Props) => {
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();
  const [products, setProducts] = useState<Array<Item>>([]);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    await getItems().then((json) => {
      setProducts(json);
    });
  };

  return (
    <Container className="w-100 m-0 d-flex p-5">
      {cartItems.length < 1 && (
        <div className="text-center">No items in cart</div>
      )}
      <Container className="w-50">
        {cartItems.map((item) => (
          <div key={item.id}>
            <CartPageItem {...item} />
            <hr
              style={{
                width: "100%",
                color: "black",
                height: "2px",
                opacity: "100%",
              }}
            />
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="ms-auto fw-bold fs-5">
            Total ({cartItems.length} items){" "}
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
          className="my-5 w-100"
          onClick={() => navigate("/")}
        >
          CONTINUE SHOPPING
        </Button>
      </Container>

      <Container className="w-50 d-flex flex-column align-items-center justify-content-between p-4">
        <div className="col-md-4 text-center">
          <p>Checkout | Payment</p>
          <hr />
          {userData?.user.address ? (
            <>
              <div className="mb-3">
                <h5>Delivering to:</h5>
                <h6 className="my-3">{userData?.user.address}</h6>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                {userData?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update adddress
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {!cartItems.length ? (
          ""
        ) : (
          <Button
            onClick={() => setLoading(true)}
            variant="outline-primary"
            className="w-100 mb-4"
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default CartPage;

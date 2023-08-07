import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar as NavbarBs,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { removeUser } from "../auth/TokenManager";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Category } from "../interfaces/CategoryType";
import { getCategories } from "../services/apiServices";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const { userData } = useContext(UserContext);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { searchValue, setSearchValue } = useContext(SearchContext);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 p-1">
       <NavbarBs.Brand as={NavLink} to="/">NatsKicks</NavbarBs.Brand>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink} className="text-primary">
            Home
          </Nav.Link>
          {/* <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link> */}
           {userData?.token && (
          <Nav.Link to="/favorites" as={NavLink} className="text-primary">
            Favorites
          </Nav.Link>
           )}
            <Dropdown className="">
              <Dropdown.Toggle
                className=" border-0"
                variant="outline-primary"
                id="dropdown-basic"
              >
                Categories
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`/categories`}  className="ps-3 text-success">
                  All categories
                </Dropdown.Item>
                <hr className="text-primary"/>
                {categories.map((c) => (
                  <Dropdown.Item key={c._id} href={`/category/${c.slug}`}>{c.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

             <Col xs="auto" className="ms-5" style={{width: '300px'}}>
            <Form.Control
            onChange={handleSearchChange}
                    value={searchValue}
              type="text"
              placeholder="Search..."
              className=" mr-sm-2"
            />
          </Col>

        </Nav>

        {userData?.token && (
          <>
          
          

            <Dropdown className="ms-4">
              <Dropdown.Toggle
                className="ps-4 pe-4 border-0"
                variant="outline-primary"
                id="dropdown-basic"
              >
                {userData.user.firstName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href={`/dashboard/${
                    userData.user.role === 1 ? "admin" : "user"
                  }`}
                  className="ps-3"
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item href="/login" onClick={removeUser}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
             {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
              marginLeft: "1rem",
            }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
          </>
        )}
       
        {!userData?.token && (
          <Nav>
            <Nav.Link to="/signup" as={NavLink}>
              Sign Up
            </Nav.Link>
            <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </NavbarBs>
  );
};

export default Navbar;

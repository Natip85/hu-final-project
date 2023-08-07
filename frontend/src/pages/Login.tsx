import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormTitle from "../components/FormTitle";
import { login } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToken, setUser } from "../auth/TokenManager";
import { UserContext } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown, setEyeShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    setEyeShown(passwordShown ? false : true);
  };

  function handleSubmit() {
    login({ email, password })
      .then((json) => {
        if (!json.success) {
          toast.error("Login details do not match");
          return;
        } else {
          toast.success(`Welcome`);
          window.setTimeout(() => {
            navigate("/");
          }, 500);
        }

        if (json.token) {
          setToken(json.token);
          setUser(json);
          setUserData(json);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }
  return (
    <Form className="w-50 m-auto">
      <FormTitle mainText="Login below" subText="to start shopping!" />

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          Email <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          Password <span className="text-danger">*</span>
        </Form.Label>
        <div className="d-flex align-items-center justify-content-center">
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordShown ? "text" : "password"}
            style={{ borderRight: "none" }}
          />
          {eyeShown ? (
            <i
              onClick={togglePasswordVisiblity}
              className="bi bi-eye-slash-fill ms-1"
              style={{
                backgroundColor: "white",
                fontSize: "1.5rem",
                border: "1px solid lightgrey",
                borderRadius: 5,
              }}
            />
          ) : (
            <i
              onClick={togglePasswordVisiblity}
              className="bi bi-eye-fill ms-1"
              style={{
                backgroundColor: "white",
                fontSize: "1.5rem",
                border: "1px solid lightgrey",
                borderRadius: 5,
              }}
            />
          )}
        </div>
      </Form.Group>

      <Button onClick={handleSubmit} variant="outline-primary" type="button">
        Login
      </Button>
    </Form>
  );
};

export default Login;

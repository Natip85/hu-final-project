import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormTitle from "../components/FormTitle";
import { useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown, setEyeShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    setEyeShown(passwordShown ? false : true);
  };

  function validate(): boolean {
    if (firstName.length < 2) {
      toast.error("First name must have a minumum of 2 characters.");
      return false;
    }
    // eslint-disable-next-line no-useless-escape
    const emailRe =
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
    if (!emailRe.test(email)) {
      toast.error("A valid email address is required.");
      return false;
    }

    if (phone.length < 10 || phone.length > 25) {
      toast.error("Must submit a valid phone number.");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validate()) return;

    signup({
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
    }).then((user) => {
      if (!user.success) {
        toast.error(`${user.message}`);
      } else {
        toast.success(user.user.firstName + ", Thank you for signing up!");
        navigate("/login");
      }
    });
  }

  return (
    <Form className="w-50 m-auto">
      <FormTitle mainText="Sign up below" subText="join now!" />

      <Form.Group className="mb-3" controlId="formBasicFname">
        <Form.Label>
          First name <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLname">
        <Form.Label>
          Last name <span className="text-muted">(optional)</span>
        </Form.Label>
        <Form.Control
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
        />
      </Form.Group>

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
      
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>
          Phone <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>
          Address <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="outline-primary" type="button">
        Sign up
      </Button>
    </Form>
  );
};

export default Signup;

import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormTitle from '../../components/FormTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { adminUpdateUser, getSingleUser } from '../../services/apiServices'
import AdminMenu from './AdminMenu'
import { User } from '../../interfaces/UserType'

type Props = {}

const EditUser = (props: Props) => {
  const navigate = useNavigate();
    const params = useParams();
  const [role, setRole] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
   useEffect(() => {
     if (!params) return;
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getUser = async () => {
    if (!params) return;
    await getSingleUser(params.id).then((json) => {
      
      setFirstName(json.firstName!);
      setRole(json.role!);
      setLastName(json.lastName!);
      setEmail(json.email!);
       setPhone(json.phone!)
       setAddress(json.address!)
    });
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

  
    return true;
  }


 
  async function handleSubmit() {
    if (!params) return;
    await adminUpdateUser(params.id, {
      role,
      firstName,
      lastName,
      email,
      phone,
      address,
    }).then((json) => {
      if (json.success) {
          toast.success(`${json.message}`);
        setTimeout(() => {
           navigate("/dashboard/admin/users");
        }, 1500);
       
      } else {
        toast.error(`${json.message}`);
      }
    });
  }

  return (
    <>
   
    <div className='col-md-3 me-5'>
<AdminMenu/>
    </div>
     <Form className="w-50 m-auto">
      <FormTitle mainText="Edit user" />

      <Form.Group className="mb-3" controlId="formBasicFname">
        <Form.Label>
          Role <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select onChange={(e)=> setRole(+e.target.value )}>
          <option>{role ? "ADMIN" : "USER"}</option>
          <option value={0}>USER</option>
          <option value={1}>ADMIN</option>
        </Form.Select>
      </Form.Group>

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
        Update
      </Button>
    </Form>
     </>
  )
}

export default EditUser
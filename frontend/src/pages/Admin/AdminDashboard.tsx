import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { UserContext } from '../../context/userContext';
import AdminMenu from './AdminMenu';

type Props = {}

const AdminDashboard = (props: Props) => {
   const { userData, setUserData } = useContext(UserContext);
  return (
   <Container>
    <h4 className='text-center'>Admin Dashboard</h4>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9'>
            
            <div className='card w-75 p-3'>
              <h3>Admin Name: {userData?.user.firstName}</h3>
              <h3>Admin Email: {userData?.user.email}</h3>
              <h3>Admin Contact: {userData?.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
   </Container>
  )
}

export default AdminDashboard
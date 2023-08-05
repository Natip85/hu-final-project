import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const AdminMenu = (props: Props) => {
  return (
    <>
     
        <div className="list-group">
          
           <NavLink to="/dashboard/admin/" className="list-group-item list-group-item-action">
             Dashboard
          </NavLink>
           <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
             Products
          </NavLink>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            Categories
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </NavLink>
        </div>
    
    </>
  )
}

export default AdminMenu
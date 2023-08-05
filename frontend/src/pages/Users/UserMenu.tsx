import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const UserMenu = (props: Props) => {
  return (
    <>
     
        <div className="list-group" >
          
           <NavLink to="/dashboard/user/" className="list-group-item list-group-item-action" >
             Dashboard
          </NavLink>
           <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" >
             Profile
          </NavLink>
          <NavLink to="/aaa" className="list-group-item list-group-item-action">
            Orders
          </NavLink>
          <NavLink to="/ddd" className="list-group-item list-group-item-action">
            Favorites
          </NavLink>
        </div>
    
    </>
  )
}

export default UserMenu
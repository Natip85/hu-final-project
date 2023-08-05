import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getAdminAuth } from "../../services/apiServices";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { json } from "stream/consumers";

const  AdminRoute=() =>{
  const [ok, setOk] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const authCheck = async () => {
      getAdminAuth().then((json) => {
        
        if (!json.success) {
          setOk(true);
        } else {
          setOk(false);
        }
      });
    };
    if (userData?.token && userData?.user.role) authCheck();
  }, [userData?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}

export default AdminRoute;
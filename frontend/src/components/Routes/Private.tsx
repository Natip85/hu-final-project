import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getUserAuth } from "../../services/apiServices";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [ok, setOk] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const authCheck = async () => {
      getUserAuth().then((json) => {
        if (json) {
          setOk(true);
        } else {
          setOk(false);
        }
      });
    };
    if (userData?.token) authCheck();
  }, [userData?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;

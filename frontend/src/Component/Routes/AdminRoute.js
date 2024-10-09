import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  console.log(",,,,,,,,,,,,,,,,,,");
  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/auth/admin-auth",
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (response.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
        authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path=""/>;
};

export default AdminRoute;

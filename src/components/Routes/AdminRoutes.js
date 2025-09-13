import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const apiUrl = process.env.REACT_APP_API_URL;

export default function AdminPrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth(); 

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.post(`${apiUrl}/api/v1/auth/admin-auth`);
        if (res.data.ok) { 
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/login" />; 
}

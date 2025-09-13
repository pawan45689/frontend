import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AdminPrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) {
          setOk(false);
          return;
        }

        const res = await axios.post(
          `${apiUrl}/auth/admin-auth`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Admin auth check failed", error);
        setOk(false);
        navigate("/login");
      }
    };

    authCheck();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}

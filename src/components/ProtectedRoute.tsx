import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

function ProtectedRoute({
  children,
  routeName,
}: {
  children: React.ReactNode;
  routeName: string;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<AuthTokenPayload>(token);
      if (!decoded.allowedRoutes.includes(routeName)) {
        navigate("/login");
      }
    } catch (e) {
      console.error("Got error", e);
      navigate("/login");
    }
  }, [navigate, routeName]);

  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<AuthTokenPayload>(token);
    if (!decoded.allowedRoutes.includes(routeName)) return null;
  } catch (e) {
    console.error("Token decode error:", e);
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

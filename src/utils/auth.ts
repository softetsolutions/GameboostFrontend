import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../api/api";

interface AuthTokenPayload {
  id: string;
  role: string;
  [key: string]: any;
}

export const getAuthInfo = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const decoded = jwtDecode<AuthTokenPayload>(token);
  const userId = decoded.id;
  const role = decoded.role;

  if (!userId) {
    throw new Error("No user ID found in token");
  }

  return { token, userId, role };
};

export const logout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    localStorage.removeItem("userToken");
  }
};

export const isAuthenticated = (): boolean => {
  try {
    getAuthInfo();
    return true;
  } catch {
    return false;
  }
};

import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../api/authApi";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/localStorage";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          console.log("Hello");
          const payload = jwt_decode(getAccessToken());
          console.log(payload);
          if (payload.role === "USER") await getMe();
          else if (payload.role === "ADMIN") await getAdmin();
        }
        // if (getMe()) {
        //   return getAccessToken();
        // } else if (getAdmin()) {
        //   return getAccessToken();
        // }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const getMe = async () => {
    const res = await authService.getMe();
    setUser(res.data.user);
  };

  const getAdmin = async () => {
    const res = await authService.getAdmin();
    setAdmin(res.data.admin);
  };

  const register = async (input) => {
    const res = await authService.register(input);
    addAccessToken(res.data.token);
    setTimeout(() => getMe(), 1);
  };

  const logout = () => {
    setUser(null);
    removeAccessToken();
  };

  const login = async (input) => {
    const res = await authService.login(input);
    addAccessToken(res.data.token);
    await getMe();
  };

  const adminLogin = async (input) => {
    const res = await authService.adminLogin(input);
    addAccessToken(res.data.token);
    // await getAdmin();
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, admin, adminLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;

import axios from "../config/axios";

export const register = (input) => axios.post("/auth/register", input);

export const login = ({ email, password }) =>
  axios.post("/auth/login", { email, password });

export const adminLogin = ({ email, password }) =>
  axios.post("/auth/adminlogin", { email, password });

export const getMe = () => axios.get("/auth/me");

export const getAdmin = () => axios.get("/auth/isadmin");

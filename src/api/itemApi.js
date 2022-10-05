import axios from "../config/axios";

export const createItem = (input) => axios.post("/post", input);

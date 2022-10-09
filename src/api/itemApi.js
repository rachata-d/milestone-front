import axios from "../config/axios";

export const createItem = (input) => axios.post("/post", input);

export const deleteItem = (id) => axios.delete(`/items/${id}`);

export const updateItem = (input) => axios.patch("/post", input);

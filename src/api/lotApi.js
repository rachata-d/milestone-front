import axios from "../config/axios";

export const createLot = (input) => axios.post("/postlot", input);
export const updateLot = (input) => axios.patch("/postlot", input);

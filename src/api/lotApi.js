import axios from "../config/axios";

export const createLot = (input) => axios.post("/postlot", input);

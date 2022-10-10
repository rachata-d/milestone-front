import axios from "../config/axios";

export const createBid = (input) => axios.post("/userbid", input);

export const getBid = (id) => axios.get(`/getbid/${id}`);

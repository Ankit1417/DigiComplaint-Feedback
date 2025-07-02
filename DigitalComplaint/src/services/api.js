import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change port if your backend runs on different one
});

export default API;

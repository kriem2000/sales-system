import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api/";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("ss-token"),
  },
});

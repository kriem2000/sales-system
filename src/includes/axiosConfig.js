import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = process.env.API_URL || "http://sales-system-api.com/api/";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("ss-token"),
  },
});

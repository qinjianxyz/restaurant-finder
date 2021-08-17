import axios from "axios";

const devUrl = {
  baseURL: "http://localhost:3005",
};

const prodUrl = { baseURL: "https://rest-finder-xyz.herokuapp.com" };

export default axios.create(
  process.env.NODE_ENV === "production" ? prodUrl : devUrl
);

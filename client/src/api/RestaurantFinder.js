import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://rest-finder-xyz.herokuapp.com/"
    : "http://localhost:3005";

export default axios.create({
  baseURL,
});

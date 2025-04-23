import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllPrices() {
    return axios.get(`/getCakePrices`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

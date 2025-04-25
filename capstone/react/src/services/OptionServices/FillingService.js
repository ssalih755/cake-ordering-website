import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllFillings() {
    return axios.get(`/filling/getFillings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addFilling(filling) {
    return axios.post(`/filling/addFilling`, filling, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

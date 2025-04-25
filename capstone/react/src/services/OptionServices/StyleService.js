import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllStyles() {
    return axios.get(`/style/getAllStyles`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addStyle(style) {
    return axios.post(`/style/addStyle`, style, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};

import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllStyles() {
    return axios.get(`/style/getAllStyles`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

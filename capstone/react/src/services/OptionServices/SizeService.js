import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllSizes() {
    return axios.get(`/size/getSizes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addSize(size) {
    return axios.post(`/size/addSize`, size, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

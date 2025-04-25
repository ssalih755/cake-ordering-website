import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllFlavors() {
    return axios.get(`/flavor/getFlavors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addFlavor(flavor) {
    return axios.post(`/flavor/addFlavor`, flavor, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllFrostings() {
    return axios.get(`/frosting/getFrostings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

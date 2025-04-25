import axios from "axios";

const token = localStorage.getItem("token");

export default {
  getAllFrostings() {
    return axios.get(`/frosting/getFrostings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addFrosting(frosting) {
    return axios.post(`/frosting/addFrosting`, frosting, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

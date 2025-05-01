import axios from "axios";

 

export default {
  getAllFrostings() {
    return axios.get(`/frosting/getFrostings`);
  },

  addFrosting(frosting) {
    return axios.post(`/frosting/addFrosting`, frosting);
  },
};

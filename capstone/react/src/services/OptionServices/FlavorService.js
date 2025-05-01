import axios from "axios";

 

export default {
  getAllFlavors() {
    return axios.get(`/flavor/getFlavors` );
  },

  addFlavor(flavor) {
    return axios.post(`/flavor/addFlavor`, flavor);
  }
};

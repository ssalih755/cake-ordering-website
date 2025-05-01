import axios from "axios";
 

export default {
  getAllFillings() {
    return axios.get(`/filling/getFillings`);
  },

  addFilling(filling) {
    return axios.post(`/filling/addFilling`, filling);
  },
};

import axios from "axios";

 

export default {
  getAllStyles() {
    return axios.get(`/style/getAllStyles`);
  },

  addStyle(style) {
    return axios.post(`/style/addStyle`, style);
  }
};

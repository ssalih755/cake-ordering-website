import axios from "axios";

 

export default {
  getAllPrices() {
    return axios.get(`/getCakePrices`);
  },
};

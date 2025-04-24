import axios from "axios";

/**
 * This service class is used to interact with the server's StandardCake API
 */

export default {
  getStandardCakes() {
    return axios.get(`/cake/getStandardCakes`);
  },

  createCake(cake) {
    return axios.post("/cake/createCake", cake);
  },
  getCakeById(cakeId) {
    return axios.get(`/cake/${cakeId}`);
  },
};

import axios from 'axios';

/**
 * This service class is used to interact with the server's StandardCake API
 */

export default {
    getStandardCakes() {
        return axios.get(`/cake/getStandardCakes`);
      },
    getCakeById(cakeId) {
        return axios.get(`/cake/${cakeId}`);
      }
 
}
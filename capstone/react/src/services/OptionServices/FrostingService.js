import axios from 'axios';

export default {
    getAllFrostings() {
        return axios.get(`/frosting/getFrostings`);
      },
 
}
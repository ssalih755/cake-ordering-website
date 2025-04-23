import axios from 'axios';

export default {
    getAllFlavors() {
        return axios.get(`/flavor/getFlavors`);
      },
 
}
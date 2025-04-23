import axios from 'axios';

export default {
    getAllFillings() {
        return axios.get(`/filling/getFillings`);
      },
 
}
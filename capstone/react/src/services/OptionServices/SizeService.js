import axios from "axios";

 

export default {
  getAllSizes() {
    return axios.get(`/size/getSizes`);
  },

  addSize(size) {
    return axios.post(`/size/addSize`, size);
  },
};

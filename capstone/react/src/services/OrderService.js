import axios from "axios";

/**
 * This service class is used to interact with the server's Order API.
 * All methods return a Promise so that the calling code can handle both success and
 * error responses appropriately.
 */

const OrderService = {
  createOrder(order) {
    return axios.post("/order", order);
  },

  getInProcessOrders() {
    return axios.get("/order/inprocessOrders");
  },

  getAllOrders() {
    return axios.get("/order/all");
  },

  getMyOrders(id) {
    return axios.get(`/order/get-my-orders/${id}`);
  },

  updateStatus(orderId) {
    return axios.put(`/order/update-status/${orderId}`);
  },

  getMyPendingOrders(id) {
    return axios.get(`/order/get-my-pending-orders/${id}`); 
  }
};

export default OrderService;

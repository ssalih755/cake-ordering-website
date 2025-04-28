import axios from "axios";

/**
 * This service class is used to interact with the server's Order API.
 * All methods return a Promise so that the calling code can handle both success and
 * error responses appropriately.
 */

const token = localStorage.getItem("token");

const OrderService = {
  createOrder(order) {
    return axios.post("/order", order);
  },
  
  getInProcessOrders() {
    return axios.get("/order/inprocessOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default OrderService;

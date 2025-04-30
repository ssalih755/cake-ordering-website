package com.techelevator.dao;

import com.techelevator.model.Order;
import com.techelevator.model.OrderHistory;

import java.util.List;

public interface OrderDao {
    Order getOrderById(int orderId);
    Order createOrder(Order order);

    List<OrderHistory> getAllInProcessOrders();

    int getOrderStatusIdById(int orderId);

    Order updateOrderStatusByOrderId(int orderId);

    List<OrderHistory> getMyOrders(int userId);

    List<OrderHistory> getAllOrders();

    List<OrderHistory> getInProcessOrdersByUserId(int userId);

}

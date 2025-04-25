package com.techelevator.dao;

import com.techelevator.model.Order;
import com.techelevator.model.OrderHistory;

import java.util.List;

public interface OrderDao {
    Order getOrderById(int orderId);
    Order createOrder(Order order);

    List<OrderHistory> getAllPendingOrders();
}

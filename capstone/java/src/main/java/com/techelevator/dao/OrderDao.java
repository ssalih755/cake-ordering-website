package com.techelevator.dao;

import com.techelevator.model.Order;

import java.util.List;

public interface OrderDao {
    Order getOrderById(int orderId);
    Order createOrder(Order order);

    List<Order> getAllPendingOrders();
}

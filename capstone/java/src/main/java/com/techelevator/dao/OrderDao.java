package com.techelevator.dao;

import com.techelevator.model.Order;

public interface OrderDao {
    Order getOrderById(int orderId);
    Order createOrder(Order order);
}

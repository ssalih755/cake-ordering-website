package com.techelevator.dao;

import com.techelevator.model.OrderDetail;

public interface OrderDetailDao {
    OrderDetail getOrderDetails(int orderId);
    OrderDetail createOrderDetails(int orderId, int cakeId, String writing, int cakeQuantity);

}

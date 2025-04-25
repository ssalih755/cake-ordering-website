package com.techelevator.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class Order {
    private int id;
    private  int orderStatusId;
    private int userId;
    private LocalDate pickupDate;
    private LocalTime pickupTime;
    private LocalDateTime Timestamp;

    private List<OrderDetail> orderDetails;

    public Order() {
    }

    public Order(int id,  int userId, int orderStatusId, LocalDate pickupDate, LocalTime pickupTime, LocalDateTime timestamp) {
        this.id = id;
        this.userId = userId;
        this.orderStatusId = orderStatusId;
        this.pickupDate = pickupDate;
        this.pickupTime = pickupTime;
        this.Timestamp = timestamp;


    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrderStatusId() {
        return orderStatusId;
    }

    public void setOrderStatusId(int orderStatusId) {
        this.orderStatusId = orderStatusId;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public LocalTime getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
    }

    public LocalDateTime getTimestamp() {
        return Timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        Timestamp = timestamp;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }
}

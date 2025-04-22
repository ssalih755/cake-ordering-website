package com.techelevator.model;

public class OrderDetail {
    private int id;
    private int orderId;
    private int cakeId;
    private int cakeQuantity;

    public OrderDetail() {
    }

    public OrderDetail(int id, int orderId, int cakeId, int cakeQuantity) {
        this.id = id;
        this.orderId = orderId;
        this.cakeId = cakeId;
        this.cakeQuantity = cakeQuantity;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCakeId() {
        return cakeId;
    }

    public void setCakeId(int cakeId) {
        this.cakeId = cakeId;
    }

    public int getCakeQuantity() {
        return cakeQuantity;
    }

    public void setCakeQuantity(int cakeQuantity) {
        this.cakeQuantity = cakeQuantity;
    }
}

package com.techelevator.model;

public class OrderDetail {
    private int id;
    private int orderId;
    private String writing;
    private int cakeId;
    private int cakeQuantity;

    public OrderDetail() {
    }

    public OrderDetail(int id, int orderId, String writing, int cakeId, int cakeQuantity) {
        this.id = id;
        this.orderId = orderId;
        this.writing = writing;
        this.cakeId = cakeId;
        this.cakeQuantity = cakeQuantity;
    }

    public String getWriting() {
        return writing;
    }

    public void setWriting(String writing) {
        this.writing = writing;
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

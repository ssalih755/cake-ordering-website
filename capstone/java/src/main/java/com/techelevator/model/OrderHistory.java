package com.techelevator.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class OrderHistory {
    private int id;
    private  int orderStatusId;
    private int userId;
    private LocalDate pickupDate;
    private LocalTime pickupTime;
    private LocalDateTime Timestamp;
    private String status;
    private String customerName;
    private String cakeName;
    private String flavor;
    private String frosting;
    private String filling;
    private String style;
    private String size;
    private String type;
    private String writing;
    private int cakeQuantity;
    private BigDecimal price;

    public OrderHistory() {
    }

    public OrderHistory(int id, int orderStatusId, int userId, LocalDate pickupDate, LocalTime pickupTime, LocalDateTime timestamp, String status, String customerName, String cakeName, String flavor, String frosting, String filling, String style, String size, String type, String writing, int cakeQuantity, BigDecimal price) {
        this.id = id;
        this.orderStatusId = orderStatusId;
        this.userId = userId;
        this.pickupDate = pickupDate;
        this.pickupTime = pickupTime;
        Timestamp = timestamp;
        this.status = status;
        this.customerName = customerName;
        this.cakeName = cakeName;
        this.flavor = flavor;
        this.frosting = frosting;
        this.filling = filling;
        this.style = style;
        this.size = size;
        this.type = type;
        this.writing = writing;
        this.cakeQuantity = cakeQuantity;
        this.price = price;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String cutomerName) {
        this.customerName = cutomerName;
    }

    public String getCakeName() {
        return cakeName;
    }

    public void setCakeName(String cakeName) {
        this.cakeName = cakeName;
    }

    public String getFlavor() {
        return flavor;
    }

    public void setFlavor(String flavor) {
        this.flavor = flavor;
    }

    public String getFrosting() {
        return frosting;
    }

    public void setFrosting(String frosting) {
        this.frosting = frosting;
    }

    public String getFilling() {
        return filling;
    }

    public void setFilling(String filling) {
        this.filling = filling;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWriting() {
        return writing;
    }

    public void setWriting(String writing) {
        this.writing = writing;
    }

    public int getCakeQuantity() {
        return cakeQuantity;
    }

    public void setCakeQuantity(int cakeQuantity) {
        this.cakeQuantity = cakeQuantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

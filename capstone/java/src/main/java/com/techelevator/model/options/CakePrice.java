package com.techelevator.model.options;

import java.math.BigDecimal;

public class CakePrice {
    private int id;
    private BigDecimal price;

    public CakePrice() {
    }

    public CakePrice(int id, BigDecimal price) {
        this.id = id;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

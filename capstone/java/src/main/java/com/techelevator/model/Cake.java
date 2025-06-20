package com.techelevator.model;

import java.math.BigDecimal;

public class Cake {

    private String name;
    private String imgURL;
    private int id;
    private String type;
    private String flavor;
    private String frosting;
    private String filling;
    private String style;
    private String size;
    private BigDecimal price;
    private String description;
    private boolean isAvailable;


    public Cake(String name, String imgURL, int id, String type, String flavor, String frosting, String filling,
                String style, String size, BigDecimal price, String description, boolean isAvailable) {
        this.name = name;
        this.imgURL = imgURL;
        this.id = id;
        this.type = type;
        this.flavor = flavor;
        this.frosting = frosting;
        this.filling = filling;
        this.style = style;
        this.size = size;
        this.price = price;
        this.description =description;
        this.isAvailable = isAvailable;
    }

    public Cake() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public void toggleAvailable(){
        if( isAvailable){
            isAvailable = false;
        } else {
            isAvailable = true;
        }
    }
}

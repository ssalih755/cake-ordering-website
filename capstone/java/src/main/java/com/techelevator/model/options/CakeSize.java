package com.techelevator.model.options;

public class CakeSize {
    private int id;
    private String style;
    private String size;
    private boolean isAvailable;

    public CakeSize() {
    }

    public CakeSize(int id, String style, String size, boolean isAvailable) {
        this.id = id;
        this.style = style;
        this.size = size;
        this.isAvailable = isAvailable;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStyle_id() {
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

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

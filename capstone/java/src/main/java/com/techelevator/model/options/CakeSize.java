package com.techelevator.model.options;

public class CakeSize {
    private int id;
    private int styleId;
    private String style;
    private String size;
    private boolean isAvailable;

    public CakeSize() {
    }

    public CakeSize(int id, int styleId, String style, String size, boolean isAvailable) {
        this.id = id;
        this.styleId = styleId;
        this.style = style;
        this.size = size;
        this.isAvailable = isAvailable;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStyleId() {
        return styleId;
    }

    public void setStyleId(int styleId) {
        this.styleId = styleId;
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

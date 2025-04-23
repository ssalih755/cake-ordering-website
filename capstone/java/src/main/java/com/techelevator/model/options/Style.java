package com.techelevator.model.options;

public class Style {
    public int id;
    public String style;
    public boolean isAvailable;

    public Style(){};
    public Style(int id, String style, boolean isAvailable) {
        this.id = id;
        this.style = style;
        this.isAvailable = isAvailable;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

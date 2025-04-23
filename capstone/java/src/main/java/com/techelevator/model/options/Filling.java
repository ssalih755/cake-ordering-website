package com.techelevator.model.options;

public class Filling {
    private int id;
    private String filling;
    private boolean isAvailable;
    public Filling(){};

    public Filling(int id, String filling, boolean isAvailable) {
        this.id = id;
        this.filling = filling;
        this.isAvailable = isAvailable;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilling() {
        return filling;
    }

    public void setFilling(String filling) {
        this.filling = filling;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

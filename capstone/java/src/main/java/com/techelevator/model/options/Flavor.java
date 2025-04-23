package com.techelevator.model.options;

public class Flavor {

    private int id;
    private String flavor;
    private boolean isAvailable;

    public Flavor(){};
    public Flavor(int id, String flavor, boolean isAvailable) {
        this.id = id;
        this.flavor = flavor;
        this.isAvailable = isAvailable;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFlavor() {
        return flavor;
    }

    public void setFlavor(String flavor) {
        this.flavor = flavor;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

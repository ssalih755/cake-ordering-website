package com.techelevator.model.options;

public class Frosting {
    private int id;
    private String frosting;
    private boolean isAvailable;

public Frosting (){};
    public Frosting(int id, String frosting, boolean isAvailable) {
        this.id = id;
        this.frosting = frosting;
        this.isAvailable = isAvailable;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFrosting() {
        return frosting;
    }

    public void setFrosting(String frosting) {
        this.frosting = frosting;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}

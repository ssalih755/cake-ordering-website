package com.techelevator.dao.optionDaos;

import com.techelevator.model.options.Flavor;

import java.util.List;

public interface FlavorDao {
    List<Flavor> getFlavors();

    List<Flavor> getAvailableFlavors();

    int getFlavorIdByName(String flavor);

    Flavor addFlavor(Flavor flavor);
    Flavor getFlavorById(int cakeflavor_id);
}

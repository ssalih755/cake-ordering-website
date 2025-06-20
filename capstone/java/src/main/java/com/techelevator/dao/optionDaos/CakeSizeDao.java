package com.techelevator.dao.optionDaos;

import com.techelevator.model.options.CakeSize;

import java.util.List;


public interface CakeSizeDao {

    List<CakeSize> getAllSizes();

    List<CakeSize> getAvailableSizes();

    int getSizeIdByName(String size);

    CakeSize getSizeById(int cakesize_id);

    CakeSize addSize(CakeSize cakeSize);
}

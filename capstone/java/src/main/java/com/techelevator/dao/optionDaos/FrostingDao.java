package com.techelevator.dao.optionDaos;

import com.techelevator.model.options.Frosting;

import java.util.List;

public interface FrostingDao {
    List<Frosting> getAllFrostings();
    List<Frosting> getAvailableFrostings();
}

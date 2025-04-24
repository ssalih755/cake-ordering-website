package com.techelevator.dao.optionDaos;

import com.techelevator.model.options.Filling;

import java.util.List;

public interface FillingDao {
    List<Filling> getFillings();

    List<Filling> getAvailableFillings();

    int getFillingIdByName(String filling);

    Filling addFilling(Filling filling);

    Filling getFillingById(int cakefilling_id );
}

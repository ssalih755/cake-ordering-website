package com.techelevator.dao.optionDaos;

import com.techelevator.model.options.Style;

import java.util.List;

public interface StyleDao {
    List<Style> getAllStyles();
    List<Style> getAvailableStyles();

    Style addStyle(Style style);
    Style getStyleById(int cakestyle_id);

    int getStyleIdByName(String style);
}

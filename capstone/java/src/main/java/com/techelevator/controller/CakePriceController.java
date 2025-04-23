package com.techelevator.controller;

import com.techelevator.dao.optionDaos.CakePriceDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakePrice;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class CakePriceController {

    private final CakePriceDao cakePriceDao;

    public CakePriceController(CakePriceDao cakePriceDao) {
        this.cakePriceDao = cakePriceDao;
    }

    @GetMapping(path = "/getCakePrices")
    public List<CakePrice> getAllPrices(){
        List<CakePrice> prices;
        try{
            prices = cakePriceDao.getAllPrices();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return prices;
    }

}

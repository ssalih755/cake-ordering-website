package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FillingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakeSize;
import com.techelevator.model.options.Filling;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin


@RequestMapping(path = "/filling")
public class FillingController {
    private final FillingDao fillingDao;

    public FillingController(FillingDao fillingDao) {
        this.fillingDao = fillingDao;
    }

    @GetMapping(path = "/getFillings")
    public List<Filling> getAllFillings() {
        List<Filling> fillings;
        try {
            fillings = fillingDao.getFillings();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return fillings;
    }

    @GetMapping(path = "/getAvailableFillings")
    public List<Filling> getAvailableFillings() {
        List<Filling> fillings;
        try {
            fillings = fillingDao.getAvailableFillings();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return fillings;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/addFilling")
    @CrossOrigin
    public void createSize(@RequestBody @Valid Filling filling){
        try{
            Filling newFilling = fillingDao.addFilling(filling);
            if (newFilling == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create filling");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
    }
}

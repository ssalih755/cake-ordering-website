package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
import com.techelevator.model.options.Frosting;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin

@RequestMapping(path = "/frosting")
public class FrostingController {
   private final FrostingDao frostingDao;

    public FrostingController(FrostingDao frostingDao) {
        this.frostingDao = frostingDao;
    }

    @GetMapping(path = "/getFrostings")
    public List<Frosting> getAllFrostings() {
        List<Frosting> frostings;
        try {
            frostings = frostingDao.getAllFrostings();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return frostings;
    }

    @GetMapping(path = "/getAvailableFrostings")
    public List<Frosting> getAvailableFrostings() {
        List<Frosting> frostings;
        try {
            frostings = frostingDao.getAvailableFrostings();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return frostings;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/addFrosting")
    @CrossOrigin
    public void createSize(@RequestBody @Valid Frosting frosting){
        try{
            Frosting newFrosting = frostingDao.addFrosting(frosting);
            if (newFrosting == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create frosting");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
    }
}

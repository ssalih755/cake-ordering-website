package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FlavorDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
import com.techelevator.model.options.Flavor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin

@RequestMapping(path = "/flavor")
public class FlavorController {
    private final FlavorDao flavorDao;

    public FlavorController(FlavorDao flavorDao) {
        this.flavorDao = flavorDao;
    }

    @GetMapping(path = "/getFlavors")
    public List<Flavor> getAllFlavors() {
        List<Flavor> flavors;
        try {
            flavors = flavorDao.getFlavors();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return flavors;
    }

    @GetMapping(path = "/getAvailableFlavors")
    public List<Flavor> getAvailableFlavors() {
        List<Flavor> flavors;
        try {
            flavors = flavorDao.getAvailableFlavors();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return flavors;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(path = "/addFlavor")
    @CrossOrigin
    public void createSize(@RequestBody @Valid Flavor flavor){
        try{
            Flavor newFlavor = flavorDao.addFlavor(flavor);
            if (newFlavor == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create flavor");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
    }

}

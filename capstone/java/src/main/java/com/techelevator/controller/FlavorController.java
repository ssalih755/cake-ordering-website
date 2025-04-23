package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FlavorDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Flavor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("hasRole('ROLE_ADMIN')")
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
}

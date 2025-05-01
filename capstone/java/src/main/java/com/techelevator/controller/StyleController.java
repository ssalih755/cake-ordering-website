package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.dao.optionDaos.StyleDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
import com.techelevator.model.options.Frosting;
import com.techelevator.model.options.Style;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin

@RequestMapping(path = "/style")
public class StyleController {
    private final StyleDao styleDao;


    public StyleController(StyleDao styleDao) {
        this.styleDao = styleDao;
    }

    @GetMapping(path = "/getAllStyles")
    public List<Style> getAllStyles() {
        List<Style> styles;
        try {
            styles = styleDao.getAllStyles();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return styles;
    }

    @GetMapping(path = "/getAvailableStyles")
    public List<Style> getAvailableStyles() {
        List<Style> styles;
        try {
            styles = styleDao.getAvailableStyles();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return styles;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/addStyle")
    @CrossOrigin
    public void createSize(@RequestBody @Valid Style style){
        try{
            Style newStyle = styleDao.addStyle(style);
            if (newStyle == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create style");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
    }
}
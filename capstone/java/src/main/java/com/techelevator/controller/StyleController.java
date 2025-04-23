package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.dao.optionDaos.StyleDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Frosting;
import com.techelevator.model.options.Style;
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
}
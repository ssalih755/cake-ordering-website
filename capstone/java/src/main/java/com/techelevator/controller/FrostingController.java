package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Frosting;
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
}

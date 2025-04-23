package com.techelevator.controller;

import com.techelevator.dao.optionDaos.FillingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
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
}

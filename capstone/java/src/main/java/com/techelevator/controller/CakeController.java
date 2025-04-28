package com.techelevator.controller;

import com.techelevator.dao.CakeDao;
import com.techelevator.dao.UserDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Cake;
import com.techelevator.model.User;
import jakarta.validation.Valid;
import net.sf.jsqlparser.expression.TryCastExpression;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
@RequestMapping(path = "/cake")
public class CakeController {

    private final CakeDao cakeDao;

    public CakeController(CakeDao cakeDao) {
        this.cakeDao = cakeDao;
    }

    @GetMapping(path = "/getStandardCakes")
    public List<Cake> getStandardCakes() {
        List<Cake> cakes;
        try {
            cakes = cakeDao.getStandardCakes();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return cakes;
    }

    @GetMapping(path = "/getAvailableStandardCakes")
    public List<Cake> getAllCakes() {
        List<Cake> cakes;
        try {
            cakes = cakeDao.getStandardAvailableCakes();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return cakes;
    }


    @GetMapping(path = "/{id}")
    public Cake getCakeById(@PathVariable int id){
        final Cake cake;
        try {
            cake = cakeDao.getCakeById(id);
            if (cake == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No cake found with that Id");

        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }

        return cake;
    }

    @PutMapping(path = "/toggleAvailable/{id}")
    public Cake toggleCakeById(@PathVariable int id){
        final Cake cake;
        try {
            cake = cakeDao.toggleAvailabilityById(id);
            if (cake == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No cake found with that Id");

        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }

        return cake;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/createCake")
    @CrossOrigin
    public Cake createNewCake(@RequestBody @Valid Cake cake){
        Cake newCake;
        try {

            // Validate user input before inserting into the database
            if (cake.getName() == null || cake.getName().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake name is required.");
            }
            if (cake.getDescription() == null || cake.getDescription().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake description is required.");
            }
            if (cake.getPrice() == null || cake.getPrice().doubleValue() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake price must be greater than 0.");
            }
            if (cake.getFlavor() == null || cake.getFlavor().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake flavor is required.");
            }
            if (cake.getFilling() == null || cake.getFilling().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake filling is required.");
            }
            if (cake.getSize() == null || cake.getSize().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake size is required.");
            }
            if (cake.getFrosting() == null || cake.getFrosting().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake frosting is required.");
            }
            if (cake.getStyle() == null || cake.getStyle().trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cake style is required.");
            }

            newCake = cakeDao.CreateCake(cake);
            if (newCake == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create cake");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
        return newCake;
    }



}

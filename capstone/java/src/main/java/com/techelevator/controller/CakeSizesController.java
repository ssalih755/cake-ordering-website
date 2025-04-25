package com.techelevator.controller;

import com.techelevator.dao.optionDaos.CakeSizeDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Cake;
import com.techelevator.model.options.CakeSize;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping(path = "/size")
public class CakeSizesController {

    private final CakeSizeDao cakeSizeDao;

    public CakeSizesController(CakeSizeDao cakeSizeDao) {
        this.cakeSizeDao = cakeSizeDao;
    }

    @GetMapping(path = "/getSizes")
   public List<CakeSize> getAllSizes(){
        List<CakeSize> sizes;
        try{
            sizes = cakeSizeDao.getAllSizes();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return sizes;
    }

    @GetMapping(path = "/getAvailableSizes")
    public List<CakeSize> getAvailableSizes(){
        List<CakeSize> sizes;
        try{
            sizes = cakeSizeDao.getAvailableSizes();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return sizes;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/addSize")
    @CrossOrigin
    public void createSize(@RequestBody @Valid CakeSize cakeSize){
        try{
            CakeSize newSize = cakeSizeDao.addSize(cakeSize);
            if (newSize == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create size");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }
    }

}

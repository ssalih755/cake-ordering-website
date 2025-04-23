package com.techelevator.controller;

import com.techelevator.dao.optionDaos.CakeSizeDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakeSize;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class CakeSizesController {

    private final CakeSizeDao cakeSizeDao;

    public CakeSizesController(CakeSizeDao cakeSizeDao) {
        this.cakeSizeDao = cakeSizeDao;
    }

    @GetMapping(path = "/getCakeSizes")
   public List<CakeSize> getAllSizes(){
        List<CakeSize> sizes;
        try{
            sizes = cakeSizeDao.getAllSizes();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return sizes;
    }
}

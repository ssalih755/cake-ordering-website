package com.techelevator.controller;

import com.techelevator.dao.OrderDao;
import com.techelevator.dao.OrderDetailDao;
import com.techelevator.model.Order;
import com.techelevator.model.OrderDetail;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping(path = "/order")
public class OrderController {

    private final OrderDao orderDao;

    public OrderController(OrderDao orderDao) {
        this.orderDao = orderDao;
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "")
    public void createNewOrder(@RequestBody @Valid Order order){
        Order newOrder = orderDao.createOrder(order);
        if(newOrder  == null){
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Unable to connect to server");
        }

    }

}

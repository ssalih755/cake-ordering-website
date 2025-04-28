package com.techelevator.controller;

import com.techelevator.dao.OrderDao;
import com.techelevator.dao.OrderDetailDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Order;
import com.techelevator.model.OrderDetail;
import com.techelevator.model.OrderHistory;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
        try {
            Order newOrder = orderDao.createOrder(order);
            if (newOrder == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create order");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request", e);
        }

    }

    @GetMapping(path = "/inprocessOrders")
    public List<OrderHistory> getAllInProcessOrders(){
        List<OrderHistory> pendingOrders;
        try{
            pendingOrders = orderDao.getAllInProcessOrders();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return pendingOrders;
    }

}

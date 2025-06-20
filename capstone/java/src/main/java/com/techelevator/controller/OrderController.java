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
    public Order createNewOrder(@RequestBody @Valid Order order){
        Order newOrder;
        try {
            newOrder = orderDao.createOrder(order);
            if (newOrder == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create order");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request", e);
        }
        return newOrder;
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

    @GetMapping(path = "/all")
    public List<OrderHistory> getAllOrders(){
        List<OrderHistory> allOrders;
        try{
            allOrders = orderDao.getAllOrders();
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return allOrders;
    }

    @PutMapping(path = "/update-status/{id}")
    public Order advanceOrderStatus(@PathVariable int id){
        final Order order;
        try {
            order = orderDao.updateOrderStatusByOrderId(id);
            if (order == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No cake found with that Id");

        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to process request");
        }

        return order;
    }



    @GetMapping(path = "/get-my-orders/{id}")
    public List<OrderHistory> getMyOrders(@PathVariable int id){
        List<OrderHistory> getMyOrders;
        try{
            getMyOrders = orderDao.getMyOrders(id);
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return getMyOrders;
    }

    @GetMapping(path = "/get-my-pending-orders/{id}")
    public List<OrderHistory> getInProcesOrdersByUserId(@PathVariable int id){
        List<OrderHistory> getMyInProcessOrders;
        try{
            getMyInProcessOrders = orderDao.getInProcessOrdersByUserId(id);
        }catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return getMyInProcessOrders;
    }

}

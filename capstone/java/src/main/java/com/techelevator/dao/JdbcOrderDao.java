package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.OrderDetail;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import com.techelevator.model.Order;

import java.util.List;

@Component
public class JdbcOrderDao  implements OrderDao {

    JdbcTemplate jdbcTemplate = new JdbcTemplate();
   // private final  OrderDetailDao orderDetailDao;

    public JdbcOrderDao(JdbcTemplate jdbcTemplate, OrderDetailDao orderDetailDao) {
        this.jdbcTemplate = jdbcTemplate;
      //  this.orderDetailDao = orderDetailDao;
    }

    @Override
    public Order getOrderById(int orderId) {
        Order order = null;

        final String sql = "SELECT id, user_id, orderstatus_id, pickup_date, pickup_time, created_at\n" +
                "FROM orders\n" +
                "WHERE id = ?;";

        try{
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, orderId);
            if (result.next()){
                order = mapRowToOrder(result);
            }
        }catch (EmptyResultDataAccessException e){
            order = null;
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return order;
    }

    @Override
    public Order createOrder(Order order) {
        List<OrderDetail> orderDetails = order.getOrderDetails();
        OrderDetail detail = orderDetails.get(0);

        String sql = "INSERT INTO orders( user_id, orderstatus_id, pickup_date, pickup_time)\n" +
                "VALUES (?, ?, ?, ?) RETURNING id;";

        String sql2 = "INSERT INTO orderdetails(order_id, cake_id, cake_quantity) VALUES (?, ?, ?) RETURNING id;";
        try {
            int newOrderId = jdbcTemplate.queryForObject(sql, int.class, order.getUserId(), order.getOrderStatusId(), order.getPickupDate(), order.getPickupTime());
            int newOrderDetailId = jdbcTemplate.queryForObject(sql2, int.class, newOrderId, detail.getCakeId(), detail.getCakeQuantity());
            return getOrderById(newOrderId);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    @Override
    public List<Order> getAllPendingOrders(){
        List<Order> pendingOrders = null;
        String sql = "";
        try{
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
            while(result.next()){
                Order order = mapRowToOrder(result);
                if(order != null){
                    pendingOrders.add(order);
                }
            }
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to process request", exception);
        }
        return pendingOrders;
    }
    private Order mapRowToOrder(SqlRowSet result) {
        Order order = new Order();

        order.setId(result.getInt("id"));
        order.setUserId(result.getInt("user_id"));
        order.setOrderStatusId(result.getInt("orderstatus_id"));
        if(result.getDate("pickup_date") != null) {
            order.setPickupDate(result.getDate("pickup_date").toLocalDate());
        }
        if(result.getTime("pickup_time") != null) {
            order.setPickupTime(result.getTime("pickup_time").toLocalTime());
        }
        if (result.getDate("created_at") != null){
            order.setTimestamp(result.getTimestamp("created_at").toLocalDateTime());
        }
        return order;
    }

}

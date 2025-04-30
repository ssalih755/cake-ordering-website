package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.OrderDetail;
import com.techelevator.model.OrderHistory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import com.techelevator.model.Order;

import java.util.ArrayList;
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

        String sql = "INSERT INTO orders( user_id, orderstatus_id, pickup_date, pickup_time)\n" +
                "VALUES (?, ?, ?, ?) RETURNING id;";

        String sql2 = "INSERT INTO orderdetails(order_id, cake_id, cake_quantity, writing) VALUES (?, ?, ?, ?) RETURNING id;";
        try {
            int newOrderId = jdbcTemplate.queryForObject(sql, int.class, order.getUserId(), order.getOrderStatusId(), order.getPickupDate(), order.getPickupTime());

            for (OrderDetail detail: orderDetails) {
                jdbcTemplate.queryForObject(sql2, int.class, newOrderId, detail.getCakeId(), detail.getCakeQuantity(), detail.getWriting());
            }
            return getOrderById(newOrderId);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    @Override
    public List<OrderHistory> getAllInProcessOrders(){
        List<OrderHistory> pendingOrders = new ArrayList<>();
        String sql = "SELECT o.id, o.user_id, o.orderstatus_id, o.pickup_date, o.pickup_time, o.created_at, os.status, u.firstname || ' ' || u.lastname AS customer_name, c.name as cake_name,\n" +
                "cf.flavor, cfr.frosting, cfl.filling, cs.style, cz.size, ct.type, od.writing, od.cake_quantity, c.cakeprice\n" +
                "FROM orders o\n" +
                "JOIN users u ON u.user_id = o.user_id\n" +
                "JOIN orderstatus os ON os.id = o.orderstatus_id\n" +
                "JOIN orderdetails od ON od.order_id = o.id\n" +
                "JOIN cake c ON c.cake_id = od.cake_id\n" +
                "JOIN cakeflavor cf ON cf.cakeflavor_id = c.cakeflavor_id\n" +
                "JOIN cakefrosting cfr ON cfr.cakefrosting_id = c.cakefrosting_id\n" +
                "JOIN cakefilling cfl ON cfl.cakefilling_id = c.cakefilling_id\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id\n" +
                "JOIN cakesize cz ON cz.cakesize_id = c.cakesize_id\n" +
                "JOIN caketype ct ON ct.caketype_id = c.caketype_id\n" +
                "WHERE o.orderstatus_id NOT IN (4,5);\n";
        try{
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
            while(result.next()){
                OrderHistory order = mapRowToOrderHistory(result);
                if(order != null){
                    pendingOrders.add(order);
                }
            }
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to process request", exception);
        }
        return pendingOrders;
    }

    @Override
    public int getOrderStatusIdById(int orderId) {
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
        return order.getOrderStatusId();
    }

    @Override
    public Order updateOrderStatusByOrderId(int orderId) {
        Order order = getOrderById(orderId);
        if (order == null) {
            throw new DaoException("Order with ID " + orderId + " not found");
        }

        //boolean which is the opposite of current status
        int newStatusId = order.updateStatusId(getOrderStatusIdById(orderId));

        String sql = "UPDATE orders SET orderstatus_id = ? WHERE id = ?;";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newStatusId, orderId);

            if (rowsAffected == 0) {
                throw new DaoException("Failed to update availability for order with ID " + orderId);
            }

            // Update the order object with new availability status
            order.setOrderStatusId(newStatusId);

        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("Unable to connect to server", exception);
        }
        return order;
    }

    @Override
    public List<OrderHistory> getMyOrders(int userId) {

        List<OrderHistory> getMyOrders = new ArrayList<>();
        String sql = "SELECT o.id, o.user_id, o.orderstatus_id, o.pickup_date, o.pickup_time, o.created_at, os.status, u.firstname || ' ' || u.lastname AS customer_name, c.name as cake_name,\n" +
                "cf.flavor, cfr.frosting, cfl.filling, cs.style, cz.size, ct.type, od.writing, od.cake_quantity, c.cakeprice\n" +
                "FROM orders o\n" +
                "JOIN users u ON u.user_id = o.user_id\n" +
                "JOIN orderstatus os ON os.id = o.orderstatus_id\n" +
                "JOIN orderdetails od ON od.order_id = o.id\n" +
                "JOIN cake c ON c.cake_id = od.cake_id\n" +
                "JOIN cakeflavor cf ON cf.cakeflavor_id = c.cakeflavor_id\n" +
                "JOIN cakefrosting cfr ON cfr.cakefrosting_id = c.cakefrosting_id\n" +
                "JOIN cakefilling cfl ON cfl.cakefilling_id = c.cakefilling_id\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id\n" +
                "JOIN cakesize cz ON cz.cakesize_id = c.cakesize_id\n" +
                "JOIN caketype ct ON ct.caketype_id = c.caketype_id\n" +
                "WHERE  o.user_id  = ?;";
        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, userId);
            while (result.next()) {
                OrderHistory order = mapRowToOrderHistory(result);
                if (order != null) {
                    getMyOrders.add(order);
                }
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to process request", exception);
        }
        return getMyOrders;
    }

    @Override
    public List<OrderHistory> getAllOrders() {

        List<OrderHistory> getAllOrders = new ArrayList<>();
        String sql = "SELECT o.id, o.user_id, o.orderstatus_id, o.pickup_date, o.pickup_time, o.created_at, os.status, u.firstname || ' ' || u.lastname AS customer_name, c.name as cake_name,\n" +
                "cf.flavor, cfr.frosting, cfl.filling, cs.style, cz.size, ct.type, od.writing, od.cake_quantity, c.cakeprice\n" +
                "FROM orders o\n" +
                "JOIN users u ON u.user_id = o.user_id\n" +
                "JOIN orderstatus os ON os.id = o.orderstatus_id\n" +
                "JOIN orderdetails od ON od.order_id = o.id\n" +
                "JOIN cake c ON c.cake_id = od.cake_id\n" +
                "JOIN cakeflavor cf ON cf.cakeflavor_id = c.cakeflavor_id\n" +
                "JOIN cakefrosting cfr ON cfr.cakefrosting_id = c.cakefrosting_id\n" +
                "JOIN cakefilling cfl ON cfl.cakefilling_id = c.cakefilling_id\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id\n" +
                "JOIN cakesize cz ON cz.cakesize_id = c.cakesize_id\n" +
                "JOIN caketype ct ON ct.caketype_id = c.caketype_id\n" +
                "ORDER BY o.orderstatus_id, o.user_id ;";

        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
            while (result.next()) {
                OrderHistory order = mapRowToOrderHistory(result);
                if (order != null) {
                    getAllOrders.add(order);
                }
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to process request", exception);
        }
        return getAllOrders;
    }

    @Override
    public List<OrderHistory> getInProcessOrdersByUserId(int userId) {

        List<OrderHistory> getMyInProccessOrders = new ArrayList<>();
        String sql = "SELECT o.id, o.user_id, o.orderstatus_id, o.pickup_date, o.pickup_time, o.created_at, os.status, u.firstname || ' ' || u.lastname AS customer_name, c.name as cake_name,\n" +
                "cf.flavor, cfr.frosting, cfl.filling, cs.style, cz.size, ct.type, od.writing, od.cake_quantity, c.cakeprice\n" +
                "FROM orders o\n" +
                "JOIN users u ON u.user_id = o.user_id\n" +
                "JOIN orderstatus os ON os.id = o.orderstatus_id\n" +
                "JOIN orderdetails od ON od.order_id = o.id\n" +
                "JOIN cake c ON c.cake_id = od.cake_id\n" +
                "JOIN cakeflavor cf ON cf.cakeflavor_id = c.cakeflavor_id\n" +
                "JOIN cakefrosting cfr ON cfr.cakefrosting_id = c.cakefrosting_id\n" +
                "JOIN cakefilling cfl ON cfl.cakefilling_id = c.cakefilling_id\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id\n" +
                "JOIN cakesize cz ON cz.cakesize_id = c.cakesize_id\n" +
                "JOIN caketype ct ON ct.caketype_id = c.caketype_id\n" +
                "WHERE  (o.user_id  = ?) AND (o.orderstatus_id NOT IN (4,5));";
        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql, userId);
            while (result.next()) {
                OrderHistory order = mapRowToOrderHistory(result);
                if (order != null) {
                    getMyInProccessOrders.add(order);
                }
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to process request", exception);
        }
        return getMyInProccessOrders;
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


    private OrderHistory mapRowToOrderHistory(SqlRowSet result) {
        OrderHistory order = new OrderHistory();

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
        order.setStatus(result.getString("status"));
        order.setCustomerName(result.getString("customer_name"));
        order.setCakeName(result.getString("cake_name"));
        order.setFlavor(result.getString("flavor"));
        order.setFrosting(result.getString("frosting"));
        order.setFilling(result.getString("filling"));
        order.setStyle(result.getString("style"));
        order.setSize(result.getString("size"));
        order.setType(result.getString("type"));
        order.setWriting(result.getString("writing"));
        order.setCakeQuantity(result.getInt("cake_quantity"));
        order.setPrice(result.getBigDecimal("cakeprice"));
        return order;
    }

}

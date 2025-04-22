package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Order;
import com.techelevator.model.OrderDetail;
import jakarta.websocket.DecodeException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.RowSet;

@Component
public class JdbcOrderDetail implements OrderDetailDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcOrderDetail(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public OrderDetail getOrderDetails(int orderId) {
        return null;
    }

    @Override
    public OrderDetail createOrderDetails(int orderId, int cakeId, String writing, int cakeQuantity) {
        String sql = "INSERT INTO orderdetails(order_id, cake_id, writing, cake_quantity) VALUES (?, ?, ?, ?);";

        try {
            SqlRowSet detail = jdbcTemplate.queryForRowSet(sql, orderId, cakeId, writing, cakeQuantity);
            OrderDetail orderDetail = mapRowToOrderDetail(detail);
            return orderDetail;
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }

    }

    private OrderDetail mapRowToOrderDetail(SqlRowSet detail) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setId(detail.getInt("id"));
        orderDetail.setWriting(detail.getString("writing"));
        orderDetail.setOrderId(detail.getInt("order_id"));
        orderDetail.setCakeId(detail.getInt("cake_id"));
        orderDetail.setCakeQuantity(detail.getInt("cake_quantity"));

        return orderDetail;
    }
}

package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JdbcTypeDao implements TypeDao{

    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcTypeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int getTypeIdByName(String type) {
        int typeId;
        String sql = "SELECT caketype_id\n" +
                "FROM caketype WHERE type ILIKE ?;";
        try {
            typeId = jdbcTemplate.queryForObject(sql, int.class, type);

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return typeId;
    }
}

package com.techelevator.dao;

import com.techelevator.dao.optionDaos.StyleDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
import com.techelevator.model.options.Style;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcStyleDao implements StyleDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcStyleDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Style> getAllStyles() {
        List<Style> styles = new ArrayList<>();

        final String sql = "SELECT cakestyle_id, style, isAvailable\n" +
                "FROM cakeStyle;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
               Style style = mapRowToStyle(results);
                styles.add(style);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return styles;

    }

    @Override
    public List<Style> getAvailableStyles() {
        List<Style> styles = new ArrayList<>();

        final String sql = "SELECT cakestyle_id, style, isAvailable\n" +
                "FROM cakeStyle WHERE isAvailable = true;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Style style = mapRowToStyle(results);
                styles.add(style);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return styles;
    }

    @Override
    public Style addStyle(Style style) {
        String sql = "INSERT INTO cakestyle( style, isavailable)\n" +
                "\tVALUES (?, ?) RETURNING cakestyle_id;";
        try {
            int newStyleId = jdbcTemplate.queryForObject(sql, int.class,
                    style.getStyle(), true);
            return getStyleById(newStyleId);
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    @Override
    public Style getStyleById(int cakestyle_id) {
        Style style = null;
        String sql = "SELECT cakestyle_id, style, isavailable\n" +
                "\tFROM cakestyle WHERE cakestyle_id = ?;";

        final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cakestyle_id);
        try {
            style = mapRowToStyle(result);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return style;
    }

    @Override
    public int getStyleIdByName(String style) {
        int styleId;
        String sql = "SELECT cakestyle_id\n" +
                "FROM cakestyle\n" +
                "WHERE style ILIKE ?;";
        try {
            styleId = jdbcTemplate.queryForObject(sql, int.class, style);

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return styleId;
    }

    private Style mapRowToStyle(SqlRowSet rs){
        Style style = new Style();
        style.setId(rs.getInt("cakestyle_id"));
        style.setStyle(rs.getString("style"));
        style.setAvailable(rs.getBoolean("isAvailable"));
        return style;
    }
}

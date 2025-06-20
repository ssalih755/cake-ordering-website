package com.techelevator.dao;

import com.techelevator.dao.optionDaos.CakeSizeDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakeSize;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcCakeSizeDao implements CakeSizeDao {

    JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcCakeSizeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<CakeSize> getAllSizes() {

        List<CakeSize> sizes = new ArrayList<>();

        String sql = "SELECT c.cakesize_id, cs.style, cs.cakestyle_id, c.size, c.isavailable\n" +
                "FROM cakesize c\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id";

        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
            while (result.next()) {
                CakeSize size = mapRowToSizes(result);
                sizes.add(size);
            }
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("CakeSizes returned an empty set", e);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return sizes;


    }

    @Override
    public List<CakeSize> getAvailableSizes() {

        List<CakeSize> sizes = new ArrayList<>();

        String sql = "SELECT c.cakesize_id, cs.style, cs.cakestyle_id, c.size, c.isavailable\n" +
                "FROM cakesize c\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id WHERE c.isAvailable = true";

        try {
            SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
            while (result.next()) {
                CakeSize size = mapRowToSizes(result);
                sizes.add(size);
            }
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("CakeSizes returned an empty set", e);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return sizes;
    }

    @Override
    public int getSizeIdByName(String size) {
        int sizeId;
        String sql = "SELECT cakesize_id\n" +
                "FROM cakesize WHERE size ILIKE ?;";
        try {
            sizeId = jdbcTemplate.queryForObject(sql, int.class, size);

        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return sizeId;
    }

    @Override
    public CakeSize getSizeById(int cakesize_id) {
        CakeSize cakeSize = null;
        String sql = "SELECT c.cakesize_id, cs.style,cs.cakestyle_id, c.size, c.isavailable\n" +
                "FROM cakesize c\n" +
                "JOIN cakestyle cs ON cs.cakestyle_id = c.cakestyle_id \n" +
                "WHERE cakesize_id = ?;";
        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cakesize_id);
            if (result.next()) {
                cakeSize = mapRowToSizes(result);
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return cakeSize;
    }

    @Override
    public CakeSize addSize(CakeSize cakeSize) {
        String sql = "INSERT INTO cakesize(cakestyle_id, size, isavailable)\n" +
                "\tVALUES (?, ?, ?) RETURNING cakesize_id;";
        try {
            int newSizeId = jdbcTemplate.queryForObject(sql, int.class,
                    1, cakeSize.getSize(), true);
            return getSizeById(newSizeId);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }


    private CakeSize mapRowToSizes(SqlRowSet result) {
        CakeSize sizes = new CakeSize();
        sizes.setId(result.getInt("cakesize_id"));
        sizes.setSize(result.getString("size"));
        sizes.setAvailable(result.getBoolean("isavailable"));
        sizes.setStyleId(result.getInt("cakestyle_id"));
        sizes.setStyle(result.getString("style"));

        return sizes;
    }
}

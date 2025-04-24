package com.techelevator.dao;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Filling;
import com.techelevator.model.options.Frosting;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFrostingDao implements FrostingDao {

    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcFrostingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Frosting> getAllFrostings() {
        List<Frosting> frostings = new ArrayList<>();

        final String sql = "SELECT cakefrosting_id, frosting, isAvailable\n" +
                "FROM cakeFrosting;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Frosting frosting = mapRowToFrosting(results);
                frostings.add(frosting);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return frostings;

    }

    @Override
    public List<Frosting> getAvailableFrostings() {
        List<Frosting> frostings = new ArrayList<>();

        final String sql = "SELECT cakefrosting_id, frosting, isAvailable\n" +
                "FROM cakeFrosting WHERE isAvailable = true;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Frosting frosting = mapRowToFrosting(results);
                frostings.add(frosting);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return frostings;

    }

    @Override
    public int getFrostingIdByName(String frosting) {
        int frostingId;
        String sql = "SELECT cakefrosting_id\n" +
                "FROM cakefrosting WHERE frosting ILIKE ?;";
        try {
            frostingId = jdbcTemplate.queryForObject(sql, int.class, frosting);

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return frostingId;
    }

    @Override
    public Frosting addFrosting(Frosting frosting) {
        String sql = "INSERT INTO cakefrosting( frostign, isavailable)\n" +
                "\tVALUES (?, ?) RETURNING cakefrosting_id;";
        try {
            int newFrostingid = jdbcTemplate.queryForObject(sql, int.class,
                    frosting.getFrosting(), true);
            return getFrostingById(newFrostingid);
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    @Override
    public Frosting getFrostingById(int cakefrosting_id) {
        Frosting frosting = null;
        String sql = "SELECT cakefrosting_id, frosting, isavailable\n" +
                "\tFROM cakefrosting WHERE cakefrosting_id = ?;";

        final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cakefrosting_id);
        try {
            frosting = mapRowToFrosting(result);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return frosting;
    }

    private Frosting mapRowToFrosting(SqlRowSet rs) {
        Frosting frosting = new Frosting();
        frosting.setId(rs.getInt("cakefrosting_id"));
        frosting.setFrosting(rs.getString("frosting"));
        frosting.setAvailable(rs.getBoolean("isAvailable"));
        return frosting;
    }
}
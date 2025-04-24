package com.techelevator.dao;

import com.techelevator.dao.optionDaos.FillingDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakeSize;
import com.techelevator.model.options.Filling;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFillingDao implements FillingDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcFillingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Filling> getFillings() {
        List<Filling> fillings = new ArrayList<>();

        final String sql = "SELECT cakefilling_id, filling, isAvailable\n" +
                "FROM cakeFilling;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Filling filling = mapRowToFilling(results);
                fillings.add(filling);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return fillings;

    }

    @Override
    public List<Filling> getAvailableFillings() {
        List<Filling> fillings = new ArrayList<>();

        final String sql = "SELECT cakefilling_id, filling, isAvailable\n" +
                "FROM cakeFilling WHERE isAvailable = true;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Filling filling = mapRowToFilling(results);
                fillings.add(filling);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return fillings;

    }

    @Override
    public int getFillingIdByName(String filling) {
        int fillingId;
        String sql = "SELECT cakefilling_id\n" +
                "FROM cakefilling WHERE filling ILIKE ?;";
        try {
            fillingId = jdbcTemplate.queryForObject(sql, int.class, filling);

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return fillingId;
    }

    @Override
    public Filling addFilling(Filling filling) {
        String sql = "INSERT INTO cakefilling( filling, isavailable)\n" +
                "\tVALUES (?, ?) RETURNING cakefilling_id;";
        try {
            int newSizeId = jdbcTemplate.queryForObject(sql, int.class,
                    filling.getFilling(), true);
            return getFillingById(newSizeId);
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    @Override
    public Filling getFillingById(int cakefilling_id) {
        Filling filling = null;
        String sql = "SELECT cakefilling_id, filling, isavailable\n" +
                "\tFROM cakefilling WHERE cakefilling_id = ?;";

        final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cakefilling_id);
        try {
            filling = mapRowToFilling(result);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return filling;
    }

    private Filling mapRowToFilling(SqlRowSet rs){
        Filling filling = new Filling();
        filling.setId(rs.getInt("cakefilling_id"));
        filling.setFilling(rs.getString("filling"));
        filling.setAvailable(rs.getBoolean("isAvailable"));
        return filling;
    }
}

package com.techelevator.dao;

import com.techelevator.dao.optionDaos.FlavorDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.Flavor;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFlavorDao implements FlavorDao {


    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcFlavorDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Flavor> getFlavors() {
       List<Flavor> flavors = new ArrayList<>();

        final String sql = "SELECT cakeflavor_id, flavor, isAvailable\n" +
                "FROM cakeFlavor;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Flavor flavor = mapRowToFlavor(results);
                flavors.add(flavor);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return flavors;

    }

    @Override
    public List<Flavor> getAvailableFlavors() {
        List<Flavor> flavors = new ArrayList<>();

        final String sql = "SELECT cakeflavor_id, flavor, isAvailable\n" +
                "FROM cakeFlavor WHERE isAvailable = true;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Flavor flavor = mapRowToFlavor(results);
                flavors.add(flavor);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return flavors;

    }

    @Override
    public int getFlavorIdByName(String flavor) {
        int flavorId;
        String sql = "SELECT cakeflavor_id\n" +
                "FROM cakeflavor WHERE flavor ILIKE ?;";
        try {
            flavorId = jdbcTemplate.queryForObject(sql, Integer.class, flavor.trim());

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return flavorId;
    }
    private Flavor mapRowToFlavor(SqlRowSet rs){
        Flavor flavor = new Flavor();
        flavor.setId(rs.getInt("cakeflavor_id"));
        flavor.setFlavor(rs.getString("flavor"));
        flavor.setAvailable(rs.getBoolean("isAvailable"));
        return flavor;
    }
}

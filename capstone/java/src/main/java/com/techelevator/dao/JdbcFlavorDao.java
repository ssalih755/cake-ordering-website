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

    private Flavor mapRowToFlavor(SqlRowSet rs){
        Flavor flavor = new Flavor();
        flavor.setId(rs.getInt("cakeflavor_id"));
        flavor.setFlavor(rs.getString("flavor"));
        flavor.setAvailable(rs.getBoolean("isAvailable"));
        return flavor;
    }
}

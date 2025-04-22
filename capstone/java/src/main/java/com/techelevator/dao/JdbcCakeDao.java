package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Cake;
import com.techelevator.model.User;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class JdbcCakeDao implements CakeDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcCakeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Cake> getStandardCakes() {
        List<Cake> cakes =new ArrayList<>();
        String sql = "SELECT name, imgURL, cake_id, cakeflavor_id, cakefrosting_id, cakefilling_id, cakestyle_id, \n" +
                "cakesize_id, caketype_id, cakeprice_id, description, isavailable\n" +    //where iSavailable true     add name for standards
                "\tFROM cake WHERE caketype_id = 1 " +
                " ORDER BY name;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                Cake cake = mapRowToCake(results);
                cakes.add(cake);
            }

        } catch (CannotGetJdbcConnectionException e) {
           throw new DaoException("Unable to connect to server or database", e);}
            return cakes;
    }

    private Cake mapRowToCake(SqlRowSet rs){
        Cake cake = new Cake();
        cake.setName(rs.getString("name"));
        cake.setImgURL(rs.getString("imgURL"));
        cake.setAvailable(rs.getBoolean("isavailable"));
        cake.setDescription(rs.getString("description"));
        cake.setFilling(rs.getString("cakefilling_id"));
        cake.setFlavor(rs.getString("cakeflavor_id"));
        cake.setFrosting(rs.getString("cakefrosting_id"));
        cake.setId(rs.getInt("cake_id"));
        cake.setPrice(rs.getInt("cakeprice_id"));
        cake.setSize(rs.getString("cakesize_id"));
        cake.setStyle(rs.getString("cakestyle_id"));
        cake.setType(rs.getString("caketype_id"));
        return cake;

    }

}

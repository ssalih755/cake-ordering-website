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
//        String sql = "SELECT name, imgURL, cake_id, cakeflavor_id, cakefrosting_id, cakefilling_id, cakestyle_id, \n" +
//                "cakesize_id, caketype_id, cakeprice_id, description, isavailable\n" +    //where iSavailable true     add name for standards
//                "\tFROM cake WHERE caketype_id = 1 " +
//                " ORDER BY name;";
        String sql = "SELECT cake.name, cake.imgURL, cake.cake_id, cakeflavor.flavor, cakefrosting.frosting, cakefilling.filling, " +
                "cakestyle.style, cakesize.size, caketype.type, cakeprice.price, cake.description, cake.isavailable " +
                "FROM cake " +
                "LEFT JOIN cakeflavor ON cake.cakeflavor_id = cakeflavor.cakeflavor_id " +
                "LEFT JOIN cakefrosting ON cake.cakefrosting_id = cakefrosting.cakefrosting_id " +
                "LEFT JOIN cakefilling ON cake.cakefilling_id = cakefilling.cakefilling_id " +
                "LEFT JOIN cakestyle ON cake.cakestyle_id = cakestyle.cakestyle_id " +
                "LEFT JOIN cakesize ON cake.cakesize_id = cakesize.cakesize_id " +
                "LEFT JOIN caketype ON cake.caketype_id = caketype.caketype_id " +
                "LEFT JOIN cakeprice ON cake.cakeprice_id = cakeprice.cakeprice_id " +
                "WHERE caketype.type = 'standard' " +
                "ORDER BY cake.name;";
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
        cake.setFilling(rs.getString("filling"));
        cake.setFlavor(rs.getString("flavor"));
        cake.setFrosting(rs.getString("frosting"));
        cake.setId(rs.getInt("cake_id"));
        cake.setPrice(rs.getInt("price"));
        cake.setSize(rs.getString("size"));
        cake.setStyle(rs.getString("style"));
        cake.setType(rs.getString("type"));
        return cake;

    }

}

package com.techelevator.dao;

import com.techelevator.dao.optionDaos.*;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Cake;
import com.techelevator.model.options.CakePrice;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcCakeDao implements CakeDao {

    private final JdbcTemplate jdbcTemplate;
    private final FlavorDao flavorDao;
    private final StyleDao styleDao;
    private final FrostingDao frostingDao;
    private final FillingDao fillingDao;
    private final CakeSizeDao cakeSizeDao;
    private final TypeDao typeDao;


    public JdbcCakeDao(JdbcTemplate jdbcTemplate, FlavorDao flavorDao, StyleDao styleDao, FrostingDao frostingDao, FillingDao fillingDao, CakeSizeDao cakeSizeDao, TypeDao typeDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.flavorDao = flavorDao;
        this.styleDao = styleDao;
        this.frostingDao = frostingDao;
        this.fillingDao = fillingDao;
        this.cakeSizeDao = cakeSizeDao;
        this.typeDao = typeDao;
    }

    @Override
    public List<Cake> getStandardAvailableCakes() {
        List<Cake> cakes = new ArrayList<>();

        String sql = "SELECT c.name AS name," +
                " c.imgURL AS imgURL," +
                " c.cake_id AS cake_id," +
                " cf.flavor AS flavor," +
                " cr.frosting AS frosting," +
                " cz.size AS size," +
                " ct.type AS type," +
                " cp.price AS price," +
                " c.description AS description," +
                " c.isavailable AS isavailable," +
                " cl.filling AS filling," +
                " cs.style AS style" +
                " FROM cake c" +
                " JOIN cakeflavor cf ON c.cakeflavor_id = cf.cakeflavor_id" +
                " JOIN cakefrosting cr ON c.cakefrosting_id = cr.cakefrosting_id" +
                " JOIN cakefilling cl ON c.cakefilling_id = cl.cakefilling_id" +
                " JOIN cakestyle cs ON c.cakestyle_id = cs.cakestyle_id" +
                " JOIN cakesize cz ON c.cakesize_id = cz.cakesize_id" +
                " JOIN caketype ct ON c.caketype_id = ct.caketype_id" +
                " JOIN cakeprice cp ON c.cakeprice_id = cp.cakeprice_id" +
                " WHERE (ct.type = 'standard') and (c.isAvailable = true); ";


        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Cake cake = mapRowToCake(results);
                cakes.add(cake);
            }

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return cakes;
    }

    @Override
    public List<Cake> getStandardCakes() {
        List<Cake> cakes = new ArrayList<>();

        String sql = "SELECT c.name AS name," +
                " c.imgURL AS imgURL," +
                " c.cake_id AS cake_id," +
                " cf.flavor AS flavor," +
                " cr.frosting AS frosting," +
                " cz.size AS size," +
                " ct.type AS type," +
                " c.price," +
                " c.description AS description," +
                " c.isavailable AS isavailable," +
                " cl.filling AS filling," +
                " cs.style AS style" +
                " FROM cake c" +
                " JOIN cakeflavor cf ON c.cakeflavor_id = cf.cakeflavor_id" +
                " JOIN cakefrosting cr ON c.cakefrosting_id = cr.cakefrosting_id" +
                " JOIN cakefilling cl ON c.cakefilling_id = cl.cakefilling_id" +
                " JOIN cakestyle cs ON c.cakestyle_id = cs.cakestyle_id" +
                " JOIN cakesize cz ON c.cakesize_id = cz.cakesize_id" +
                " JOIN caketype ct ON c.caketype_id = ct.caketype_id" +
                " WHERE ct.type = 'standard';";


        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Cake cake = mapRowToCake(results);
                cakes.add(cake);
            }

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return cakes;
    }

    @Override
    public Cake getCakeById(int cake_id) {
        Cake cake = null;
        String sql = "SELECT c.name AS name," +
                " c.imgURL AS imgURL," +
                " c.cake_id AS cake_id," +
                " cf.flavor AS flavor," +
                " cr.frosting AS frosting," +
                " cz.size AS size," +
                " ct.type AS type," +
                " c.price," +
                " c.description AS description," +
                " c.isavailable AS isavailable," +
                " cl.filling AS filling," +
                " cs.style AS style" +
                " FROM cake c" +
                " JOIN cakeflavor cf ON c.cakeflavor_id = cf.cakeflavor_id" +
                " JOIN cakefrosting cr ON c.cakefrosting_id = cr.cakefrosting_id" +
                " JOIN cakefilling cl ON c.cakefilling_id = cl.cakefilling_id" +
                " JOIN cakestyle cs ON c.cakestyle_id = cs.cakestyle_id" +
                " JOIN cakesize cz ON c.cakesize_id = cz.cakesize_id" +
                " JOIN caketype ct ON c.caketype_id = ct.caketype_id" +
                " WHERE c.cake_id = ?;";
        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cake_id);
            if (result.next()) {
                cake = mapRowToCake(result);
            }
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return cake;
    }

    public Cake toggleAvailabilityById(int cake_id) {
        Cake cake = getCakeById(cake_id);
        if (cake == null) {
            throw new DaoException("Cake with ID " + cake_id + " not found");
        }

        //boolean which is the opposite of current status
        boolean newAvailabilityStatus = !cake.isAvailable();

        String sql = "UPDATE cake SET isavailable = ? WHERE cake_id = ?;";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newAvailabilityStatus, cake_id);

            if (rowsAffected == 0) {
                throw new DaoException("Failed to update availability for cake with ID " + cake_id);
            }

            // Update the cake object with new availability status
            cake.setAvailable(newAvailabilityStatus);

        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("Unable to connect to server", exception);
        }
        return cake;}

    @Override
    public Cake CreateCake(Cake cake) {
        String sql = "INSERT INTO cake(name, imgurl, cakeflavor_id, cakefrosting_id, cakefilling_id, cakestyle_id, cakesize_id, caketype_id, cakeprice, description, isavailable)\n" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING cake_id;";
        try{
            int newCakeId = jdbcTemplate.queryForObject(sql, int.class,
                    cake.getName(),
                    cake.getImgURL(),
                   flavorDao.getFlavorIdByName(cake.getFlavor()),
                   frostingDao.getFrostingIdByName(cake.getFrosting()),
                    fillingDao.getFillingIdByName(cake.getFilling()),
                    styleDao.getStyleIdByName(cake.getStyle()),
                    cakeSizeDao.getSizeIdByName(cake.getSize()),
                    typeDao.getTypeIdByName(cake.getType()),
                    cake.getPrice(),
                    cake.getDescription(),
                    true
            );
            System.out.println(flavorDao.getFlavorIdByName(cake.getFlavor()));
            return getCakeById(newCakeId);
        } catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
    }

    private Cake mapRowToCake(SqlRowSet rs) {
        Cake cake = new Cake();
        cake.setName(rs.getString("name"));
        cake.setImgURL(rs.getString("imgURL"));
        cake.setAvailable(rs.getBoolean("isavailable"));
        cake.setDescription(rs.getString("description"));
        cake.setFilling(rs.getString("filling"));
        cake.setFlavor(rs.getString("flavor"));
        cake.setFrosting(rs.getString("frosting"));
        cake.setId(rs.getInt("cake_id"));
        cake.setPrice(rs.getBigDecimal("price"));
        cake.setSize(rs.getString("size"));
        cake.setStyle(rs.getString("style"));
        cake.setType(rs.getString("type"));
        return cake;
    }


}

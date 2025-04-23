package com.techelevator.dao;

import com.techelevator.dao.optionDaos.CakePriceDao;
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

    public JdbcCakeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Cake> getStandardCakes() {
        List<Cake> cakes =new ArrayList<>();

        String sql = "SELECT c.name, c.imgURL, c.cake_id, cf.flavor, cr.frosting,\n" +
                " cz.size, ct.type, cp.price, c.description, c.isavailable \n" +
                "FROM cake c\n" +
                "JOIN cakeflavor cf ON c.cakeflavor_id = cf.cakeflavor_id\n" +
                "JOIN cakefrosting cr ON c.cakefrosting_id = cr.cakefrosting_id\n" +
                "JOIN cakefilling cl ON c.cakefilling_id = cl.cakefilling_id  \n" +
                "JOIN cakestyle cs ON c.cakestyle_id = cs.cakestyle_id          \n" +
                "JOIN cakesize cz ON c.cakesize_id = cz.cakesize_id\n" +
                "JOIN caketype ct ON c.caketype_id = ct.caketype_id\n" +
                "JOIN cakeprice cp ON c.cakeprice_id = cp.cakeprice_id\n" +
                "WHERE ct.type = 'standard'\n" +
                "ORDER BY c.name;";
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

    @Override
    public Cake getCakeById(int cake_id) {
        Cake cake =null;
        String sql = "SELECT name, imgurl, cake_id, cakeflavor_id, cakefrosting_id, cakefilling_id, cakestyle_id, cakesize_id, caketype_id, cakeprice_id, description, isavailable\n" +
                "\tFROM cake\n" +
                "\tWHERE cake_id = ?;";
        try {
            final SqlRowSet result = jdbcTemplate.queryForRowSet(sql, cake_id);
            if (result.next()) {
                cake = mapRowToOneCake(result);
            }
        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return cake;
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
        cake.setPrice(rs.getInt("price"));
        cake.setSize(rs.getString("size"));
        cake.setStyle(rs.getString("style"));
        cake.setType(rs.getString("type"));
        return cake;
    }

    //added ths for get by id
        private Cake mapRowToOneCake(SqlRowSet rs){
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

    @Component
    public static class JdbcCakePriceDao implements CakePriceDao {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();

        public JdbcCakePriceDao(JdbcTemplate jdbcTemplate){
            this.jdbcTemplate = jdbcTemplate;
        }

        @Override
        public List<CakePrice> getAllPrices() {
            List<CakePrice> prices = new ArrayList<>();

            String sql = "SELECT cakeprice_id, price FROM cakeprice;";

            try {
                SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
                while(result.next()) {
                    CakePrice price = mapRowToPrices(result);
                    prices.add(price);
                }
            }catch (EmptyResultDataAccessException e){
                throw new DaoException("CakePrices returned an empty set", e);
            }catch (CannotGetJdbcConnectionException exception) {
                throw new DaoException("unable to connect to server", exception);
            }
            return prices;


        }

        private CakePrice mapRowToPrices(SqlRowSet result) {
            CakePrice prices = new CakePrice();
            prices.setId(result.getInt("cakePrice_id"));
            prices.setPrice(BigDecimal.valueOf(result.getInt("Price")));

            return prices;
        }

    }
}

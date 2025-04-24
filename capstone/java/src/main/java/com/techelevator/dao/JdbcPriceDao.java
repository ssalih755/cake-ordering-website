package com.techelevator.dao;

import com.techelevator.dao.optionDaos.CakePriceDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.options.CakePrice;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcPriceDao implements CakePriceDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public JdbcPriceDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<CakePrice> getAllPrices() {
        List<CakePrice> prices = new ArrayList<>();

        final String sql = "SELECT cakeprice_id, price\n" +
                "FROM cakePrice;";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()){
                CakePrice cakePrice = mapRowToPrice(results);
                prices.add(cakePrice);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);}
        return prices;

    }

    @Override
    public int getPriceIdByName(int price) {
        int priceId;
        String sql = "SELECT cakeprice_id\n" +
                "FROM cakeprice\n" +
                "WHERE price = ?;";
        try {
            priceId = jdbcTemplate.queryForObject(sql, int.class, price);

        }catch (CannotGetJdbcConnectionException exception) {
            throw new DaoException("unable to connect to server", exception);
        }
        return priceId;
    }
    private CakePrice mapRowToPrice(SqlRowSet rs){
        CakePrice cakePrice = new CakePrice();
        cakePrice.setId(rs.getInt("cakeprice_id"));
        cakePrice.setPrice(rs.getBigDecimal("price"));
        return cakePrice;
    }
}

package com.techelevator.dao;

import com.techelevator.dao.optionDaos.FrostingDao;
import com.techelevator.exception.DaoException;
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

    private Frosting mapRowToFrosting(SqlRowSet rs) {
        Frosting frosting = new Frosting();
        frosting.setId(rs.getInt("cakefrosting_id"));
        frosting.setFrosting(rs.getString("frosting"));
        frosting.setAvailable(rs.getBoolean("isAvailable"));
        return frosting;
    }
}
package com.techelevator.dao;

import com.techelevator.model.Cake;

import java.util.List;

public interface CakeDao {
    List<Cake> getStandardCakes();
   public Cake getCakeById(int cake_id);

   public Cake toggleAvailability(int cake_id);

}

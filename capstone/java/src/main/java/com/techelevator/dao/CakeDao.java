package com.techelevator.dao;

import com.techelevator.model.Cake;

import java.util.List;

public interface CakeDao {
    List<Cake> getStandardCakes();
   Cake getCakeById(int cake_id);

   Cake CreateCake(Cake cake);

}

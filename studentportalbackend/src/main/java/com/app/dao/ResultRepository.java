package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

	
    // Custom query methods (if needed)
}
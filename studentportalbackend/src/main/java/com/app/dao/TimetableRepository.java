package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Timetable;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
	List<Timetable> findByDept(String dept);
	
}
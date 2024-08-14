package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Assignment;
import com.app.entities.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

	List<Subject> findByDepartmentId(Long departmentId);

	
}
package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

	List<Assignment> findBySubjectDepartmentId(Long departmentId);
}

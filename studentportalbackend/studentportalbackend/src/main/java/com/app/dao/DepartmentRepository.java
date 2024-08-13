package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}

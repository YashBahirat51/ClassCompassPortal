package com.app.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

	List<Notice> findByDepartment(String departmentName);
    // Custom query methods can be added here if needed
}
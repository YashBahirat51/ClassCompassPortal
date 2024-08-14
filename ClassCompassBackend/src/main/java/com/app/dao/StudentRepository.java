package com.app.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Student;
import com.app.entities.Timetable;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    //Student findByPrnno(String prnno);
    Student findByEmail(String email);
    Optional<Student> findByPrnno(String prnno);
}

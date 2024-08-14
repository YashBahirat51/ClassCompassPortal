package com.app.mapper;

import org.springframework.stereotype.Component;

import com.app.dto.StudentDTO;
import com.app.entities.Student;

@Component
public class StudentMapper {

    // Existing methods

    public Student toEntity(StudentDTO dto) {
        if (dto == null) {
            return null;
        }
        Student student = new Student();
        student.setId(dto.getId());
        student.setPrnno(dto.getPrnno());
        student.setFname(dto.getFname());
        student.setLname(dto.getLname());
        student.setEmail(dto.getEmail());
        student.setImage(dto.getImage());
        student.setPassword(dto.getPassword());  // Fixed typo here
        // Optionally set department if needed
        return student;
    }

    public StudentDTO toDTO(Student student) {
        if (student == null) {
            return null;
        }
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setPrnno(student.getPrnno());
        dto.setFname(student.getFname());
        dto.setLname(student.getLname());
        dto.setEmail(student.getEmail());
        dto.setImage(student.getImage());
        // Set department ID
        if (student.getDepartment() != null) {
            dto.setDepartment(student.getDepartment().getId());
            dto.setDepartmentName(student.getDepartment().getName());
            System.out.println(student.getDepartment().getName());
        }
  
        return dto;
    }
}

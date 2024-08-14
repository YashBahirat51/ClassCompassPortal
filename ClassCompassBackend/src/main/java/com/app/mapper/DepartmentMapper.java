package com.app.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.app.dto.DepartmentDTO;
import com.app.dto.FacultyDTO;
import com.app.dto.StudentDTO;
import com.app.dto.SubjectDTO;
import com.app.entities.Department;
import com.app.entities.Faculty;
import com.app.entities.Student;
import com.app.entities.Subject;

@Component
public class DepartmentMapper {

 public DepartmentDTO toDTO(Department department) {
     if (department == null) {
         return null;
     }
     DepartmentDTO dto = new DepartmentDTO();
     dto.setId(department.getId());
     dto.setName(department.getName());
     dto.setHead(department.getHead());
     dto.setStudents(department.getStudents().stream().map(this::toDTO).collect(Collectors.toSet()));
     dto.setSubjects(department.getSubjects().stream().map(this::toDTO).collect(Collectors.toSet()));
     dto.setFaculties(department.getFaculties().stream().map(this::toDTO).collect(Collectors.toSet()));
     return dto;
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
     return dto;
 }

 public SubjectDTO toDTO(Subject subject) {
     if (subject == null) {
         return null;
     }
     SubjectDTO dto = new SubjectDTO();
     dto.setId(subject.getId());
     dto.setName(subject.getName());
     return dto;
 }

 public FacultyDTO toDTO(Faculty faculty) {
     if (faculty == null) {
         return null;
     }
     FacultyDTO dto = new FacultyDTO();
     dto.setId(faculty.getId());
     dto.setFname(faculty.getFname());
     dto.setLname(faculty.getLname());
     return dto;
 }
}

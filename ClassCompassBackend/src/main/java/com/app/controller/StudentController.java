package com.app.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.StudentDTO;
import com.app.entities.Student;
import com.app.mapper.StudentMapper;
import com.app.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    StudentMapper studentMapper;
    
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.saveStudent(student));
    }
//
    @PostMapping("/login")
    public ResponseEntity<StudentDTO> login(@RequestBody Student student) {
       System.out.println("in student	 login");
    	Student existingstudent = studentService.getStudentByEmail(student.getEmail());
        if (existingstudent != null && existingstudent.getPassword().equals(student.getPassword())) {
            // In a real application, generate a token and return it
        	 return ResponseEntity.status(HttpStatus.CREATED).body(studentMapper.toDTO(existingstudent)); // Placeholder response
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{prnno}")
    public ResponseEntity<Student> getStudentByPrnno(@PathVariable String prnno) {
        return ResponseEntity.ok(studentService.getStudentByPrnno(prnno));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        return ResponseEntity.ok(studentService.getStudentByEmail(email));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String id) {
        studentService.deleteStudentByPrnno(id);
        return ResponseEntity.noContent().build();
    }
//
//    @PutMapping("/{prnno}")
//    public ResponseEntity<StudentDTO> updateStudent(@PathVariable String prnno, @RequestBody StudentDTO studentDTO) {
//        StudentDTO updatedStudent = studentService.updateStudent(prnno, studentDTO);
//        return ResponseEntity.ok(updatedStudent);
//    }

//    @PutMapping("/{prnno}")
//    public ResponseEntity<Student> updateStudent(
//            @PathVariable("prnno") Long prnno,
//            @ModelAttribute Student student,
//            @RequestParam(value = "image", required = false) MultipartFile image) {
//
//        try {
//            Student updatedStudent = studentService.updateStudent(prnno, student, image);
//            return ResponseEntity.ok(updatedStudent);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
    @PutMapping("/update/{prnno}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable String prnno,
            @RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            byte[] imageBytes = image != null ? image.getBytes() : null;
            StudentDTO updatedStudent = studentService.updateStudent(prnno, fname, lname, email, password, imageBytes);
            return ResponseEntity.ok(updatedStudent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<StudentDTO> addStudent(
            @RequestParam("prnno") String prnno,
            @RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("department") Long department,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            byte[] imageBytes = (image != null) ? image.getBytes() : null;
            StudentDTO newStudent = studentService.addStudent(prnno, fname, lname, email, password, department, imageBytes);
            return ResponseEntity.ok(newStudent);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}


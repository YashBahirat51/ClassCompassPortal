package com.app.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.custom_exceptions.StudentNotFoundException;
import com.app.dao.DepartmentRepository;
import com.app.dao.StudentRepository;
import com.app.dto.StudentDTO;
import com.app.entities.Department;
import com.app.entities.Student;
import com.app.mapper.StudentMapper;

@Service
public class StudentService {

	 @Autowired
	    private StudentRepository studentRepository;
	 @Autowired
	    private DepartmentRepository departmentRepository;
	 @Autowired
	    private StudentMapper studentMapper;
	
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }
    

    public Student updateStudent(String prnno, Student student, MultipartFile image) {
        Student existingStudent = getStudentByPrnno(prnno);

        // Update fields
        existingStudent.setFname(student.getFname());
        existingStudent.setLname(student.getLname());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPassword(student.getPassword());

        // Handle image if provided
        if (image != null && !image.isEmpty()) {
            // Save the image or update the image URL in the student entity
            // existingStudent.setImage(imageURL);
        }

        return studentRepository.save(existingStudent);
    }
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(student->studentMapper.toDTO(student)).collect(Collectors.toList());
        
    }

    public Student getStudentByPrnno(String prnno) {
        return studentRepository.findByPrnno(prnno).orElseThrow(() -> new StudentNotFoundException("Student not found with PRN: " + prnno));
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public void deleteStudentByPrnno(String id) {
        Student student = studentRepository.findByPrnno(id)
        .orElseThrow(() -> new StudentNotFoundException("Student not found with PRN: " + id)); 
        studentRepository.delete(student);
    }

//    public StudentDTO updateStudent(String prnno, StudentDTO studentDTO) {
//        Student existingStudent = studentRepository.findByPrnno(prnno)
//            .orElseThrow(() -> new StudentNotFoundException("Student not found with PRN: " + prnno));
//
//        // Update fields from DTO
//        existingStudent.setFname(studentDTO.getFname());
//        existingStudent.setLname(studentDTO.getLname());
//        existingStudent.setEmail(studentDTO.getEmail());
//        existingStudent.setPassword(studentDTO.getPassword());
//        existingStudent.setImage(studentDTO.getImage());
//        // Optionally update department if needed
//
//        Student updatedStudent = studentRepository.save(existingStudent);
//        return studentMapper.toDTO(updatedStudent);
//    }   
    
//    public StudentDTO saveStudent(StudentDTO studentDTO) {
//    	Department dept=departmentRepository.findById(studentDTO.getDepartment()).orElseThrow(null);
//    
//        Student student = studentMapper.toEntity(studentDTO);
//
//        // Fetch the department entity
//        Department department = departmentRepository.findById(studentDTO.getDepartment()).orElse(null);
//        student.setDepartment(department);
//
//        Student savedStudent = studentRepository.save(student);
//        return studentMapper.toDTO(savedStudent);
//    }
    public StudentDTO addStudent(String prnno, String fname, String lname, String email, String password, Long department, byte[] image) {
        // Create a new Student entity
        Student student = new Student();
        student.setPrnno(prnno);
        student.setFname(fname);
        student.setLname(lname);
        student.setEmail(email);
        student.setPassword(password);
        //departmentRepository.findById(department);
        student.setDepartment(departmentRepository.findById(department).orElseThrow()); 
        student.setImage(image);

        // Save the student entity
        Student savedStudent = studentRepository.save(student);

        // Convert to DTO and return
        return convertToDTO1(savedStudent);
    }

    private StudentDTO convertToDTO1(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setPrnno(student.getPrnno());
        dto.setFname(student.getFname());
        dto.setLname(student.getLname());
        dto.setEmail(student.getEmail());
        dto.setPassword(student.getPassword());
        dto.setDepartment(student.getDepartment().getId());
        dto.setImage(student.getImage());
        return dto;
    }
   

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }
//    public StudentDTO updateStudent(String prnno, StudentDTO studentDTO) {
//        Student existingStudent = studentRepository.findByPrnno(prnno)
//                .orElseThrow(() -> new RuntimeException("Student not found with PRN: " + prnno));
//
//        existingStudent.setFname(studentDTO.getFname());
//        existingStudent.setLname(studentDTO.getLname());
//        existingStudent.setEmail(studentDTO.getEmail());
//        existingStudent.setPassword(studentDTO.getPassword());
//        existingStudent.setImage(studentDTO.getImage());
//
//        Student updatedStudent = studentRepository.save(existingStudent);
//        return convertToDTO(updatedStudent);
//    }
//    public StudentDTO updateStudent(String prnno, String fname, String lname, String email, String password, byte[] image) {
//        Student existingStudent = studentRepository.findByPrnno(prnno)
//                .orElseThrow(() -> new RuntimeException("Student not found with PRN: " + prnno));
//
//        existingStudent.setFname(fname);
//        existingStudent.setLname(lname);
//        existingStudent.setEmail(email);
//        existingStudent.setPassword(password);
//        existingStudent.setImage(image);
//
//        Student updatedStudent = studentRepository.save(existingStudent);
//        return convertToDTO(updatedStudent);
//    }
    public StudentDTO updateStudent(String prnno, String fname, String lname, String email, String password, byte[] imageBytes) {
        Student student = studentRepository.findByPrnno(prnno)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setFname(fname);
        student.setLname(lname);
        student.setEmail(email);
        student.setPassword(password);
        if (imageBytes != null) {
            student.setImage(imageBytes);
        }

        Student updatedStudent = studentRepository.save(student);
        return studentMapper.toDTO(updatedStudent);
    }

    private StudentDTO convertToDTO(Student student) {
        return new StudentDTO(student.getPrnno(), student.getFname(), student.getLname(), student.getEmail(), student.getPassword(), student.getImage());
    }

    private Student convertToEntity(StudentDTO studentDTO) {
        return new Student(studentDTO.getPrnno(), studentDTO.getFname(), studentDTO.getLname(), studentDTO.getEmail(), studentDTO.getPassword(), studentDTO.getImage());
    }

   
}

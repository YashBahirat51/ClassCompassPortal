package com.app.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.app.security.CustomUser;
import com.app.security.JwtUtils;
import com.app.service.StudentService;

import io.jsonwebtoken.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/students")
public class StudentController  {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager mgr;
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Student student, HttpServletResponse response) {
//        Student existingStudent = studentService.getStudentByEmail(student.getEmail());
//        if (existingStudent != null && passwordEncoder.matches(student.getPassword(), existingStudent.getPassword())) {
//            String token = jwtUtil.generateToken(existingStudent.getEmail());
//
//            // Create and configure the cookie
//            Cookie cookie = new Cookie("jwt", token);
//            cookie.setHttpOnly(true);
//            cookie.setSecure(false); // Set to true in production with HTTPS
//            cookie.setPath("/");
//            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//            response.addCookie(cookie);
//
//            // Manually set SameSite=None attribute by modifying the header
//            response.addHeader("Set-Cookie", cookie.getName() + "=" + cookie.getValue() +
//                    "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=" + cookie.getMaxAge());
//
//            // Convert the Student entity to StudentDTO
//            StudentDTO studentDTO = studentMapper.toDTO(existingStudent);
//
//            return ResponseEntity.ok(studentDTO);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//    }
//    @PostMapping("/login")
//	public ResponseEntity<?> signinUser(@RequestBody Student student) {
////		System.out.println("in signin " + reqDTO);
//		// simply invoke authentucate(...) on AuthMgr
//		// i/p : Authentication => un verifed credentials
//		// i/f --> Authentication --> imple by UsernamePasswordAuthToken
//		// throws exc OR rets : verified credentials (UserDetails i.pl class: custom
//		// user details)
//
//		Authentication verifiedAuth = mgr
//				.authenticate(new UsernamePasswordAuthenticationToken
//						(student.getEmail(), student.getPassword()));
//		System.out.println(verifiedAuth.getClass());// Custom user details
//		// => auth success
//		return ResponseEntity
//				.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
//
//	}

	@PostMapping("/login")
	public ResponseEntity<?> signinUser(@RequestBody StudentDTO studentDTO, HttpServletResponse response) {
	    // Authenticate the user
	    Authentication verifiedAuth = mgr.authenticate(
	            new UsernamePasswordAuthenticationToken(studentDTO.getEmail(), studentDTO.getPassword()));
	    
	    System.out.println(verifiedAuth.getClass()); // Custom user details

	    // Generate JWT token
	    String jwtToken = utils.generateJwtToken(verifiedAuth);

	    // Create a cookie to store the JWT token
	    Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
	    jwtCookie.setHttpOnly(true); // Make it inaccessible to JavaScript for security
	    jwtCookie.setSecure(true); // Ensure the cookie is sent over HTTPS
	    jwtCookie.setPath("/"); // Set the path where the cookie is valid
	    jwtCookie.setMaxAge(24 * 60 * 60); // Set cookie expiration (1 day)

	    // Add the cookie to the response
	    response.addCookie(jwtCookie);
	    Student student=studentService.getStudentByEmail(studentDTO.getEmail());
	    if(student.getPassword().equals(studentDTO.getPassword()));
	    // Return response entity with a success message
	    return ResponseEntity.ok(studentMapper.toDTO(student));
	}

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword())); // Encode password before saving
        return ResponseEntity.ok(studentService.saveStudent(student));
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

    @PutMapping("/update/{prnno}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable String prnno,
            @RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image) throws java.io.IOException {

        try {
            byte[] imageBytes = image != null ? image.getBytes() : null;
            StudentDTO updatedStudent = studentService.updateStudent(prnno, fname, lname, email, passwordEncoder.encode(password), imageBytes);
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
            @RequestParam(value = "image", required = false) MultipartFile image) throws java.io.IOException {

        try {
            byte[] imageBytes = (image != null) ? image.getBytes() : null;
            StudentDTO newStudent = studentService.addStudent(prnno, fname, lname, email, passwordEncoder.encode(password), department, imageBytes);
            return ResponseEntity.ok(newStudent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	
}

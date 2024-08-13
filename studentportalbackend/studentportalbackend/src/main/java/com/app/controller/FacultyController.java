package com.app.controller;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.FacultyDTO;
import com.app.entities.Assignment;
import com.app.entities.Faculty;
import com.app.service.AssignmentService;
import com.app.service.FacultyService;

@RestController
@RequestMapping("/api/faculties")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;
    @Autowired
    private AssignmentService assignmentService;

    @GetMapping("/all")
    public ResponseEntity<List<FacultyDTO>> getAllFaculties() {
    	System.out.println("on ctrlr");
        return ResponseEntity.ok(facultyService.getAllFaculties());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Faculty> getFacultyByEmail(@PathVariable String email) {
        return ResponseEntity.ok(facultyService.getFacultyByEmail(email));
    }

   
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Faculty faculty) {
        Faculty existingfaculty = facultyService.getFacultyByEmail(faculty.getEmail());
        if (existingfaculty != null && existingfaculty.getPassword().equals(faculty.getPassword())) {
            // In a real application, generate a token and return it
            System.out.println("login succesfull");
        	return ResponseEntity.ok("Login successful"); // Placeholder response
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
    
    @PostMapping("/assignments")
    public ResponseEntity<Assignment> createAssignment(
            @RequestParam String name,
            @RequestParam String deadline, // Expecting "YYYY-MM-DD" format
            @RequestParam String questionImage) throws IOException {

        // Convert LocalDate to LocalDateTime with a default time
        LocalDate localDate = LocalDate.parse(deadline);

        Assignment assignment = new Assignment();
        assignment.setName(name);
        assignment.setDeadline(localDate);
        assignment.setQuestion(questionImage);

        Assignment savedAssignment = assignmentService.saveAssignment(assignment);

        return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Faculty> addFaculty(
            @RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("department") Long departmentId,
            @RequestParam("subjectId") Long subjectId) {

        try {
            Faculty faculty = facultyService.saveFaculty(fname, lname, email, password, departmentId, subjectId);
            return ResponseEntity.ok(faculty);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
//    @PutMapping("/update/{id}")
//    public ResponseEntity<Faculty> updateFaculty(@PathVariable Long id, @RequestBody FacultyDTO facultyDTO) {
//        Faculty updatedFaculty = facultyService.updateFaculty(id, facultyDTO);
//        if (updatedFaculty != null) {
//            return ResponseEntity.ok(updatedFaculty);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFaculty(
            @PathVariable("id") Long id,
            @RequestBody FacultyDTO facultyDTO) {
    	 // Validate input
        if (id == null || facultyDTO == null) {
        	 return ResponseEntity.badRequest().body("Invalid input");
        }

        try {
            // Convert DTO to entity and update
            Faculty updatedFaculty = facultyService.updateFaculty(id, facultyDTO);
            return ResponseEntity.ok(updatedFaculty);
        } catch (Exception e) {
            // Handle errors and exceptions
            System.out.println(e.getMessage());
        	return ResponseEntity.status(500).body("Error updating faculty: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.ok().build();
    }
}

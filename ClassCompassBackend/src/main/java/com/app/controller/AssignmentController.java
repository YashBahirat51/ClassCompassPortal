package com.app.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AssignmentDTO;
import com.app.dto.AssignmentRequest;
import com.app.entities.Assignment;
import com.app.entities.Subject;
import com.app.service.AssignmentService;
import com.app.service.SubjectService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

	 @Autowired
	    private AssignmentService assignmentService;
	 @Autowired
	    private SubjectService subjectService;

    // Endpoint to get all assignments
    @GetMapping
    public ResponseEntity<List<AssignmentDTO>> getAllAssignments() {
        List<AssignmentDTO> assignments = assignmentService.getAllAssignments();
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

//   
    @PostMapping
    public ResponseEntity<AssignmentDTO> createAssignment(@RequestBody AssignmentRequest request) {
        try {
            // Parse the deadline string into a LocalDate
           

            return new ResponseEntity<>(assignmentService.createAssignment(request), HttpStatus.CREATED);
        } catch (DateTimeParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        try {
            assignmentService.deleteAssignment(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<AssignmentDTO>> getAssignmentsByDepartment(@PathVariable Long departmentId) {
        System.out.println("Department id"+departmentId);
    	List<AssignmentDTO> assignments = assignmentService.getAssignmentsByDepartment(departmentId);
        assignments.forEach(a->System.out.println(a.getName()));
    	return ResponseEntity.ok(assignments);
    }
}

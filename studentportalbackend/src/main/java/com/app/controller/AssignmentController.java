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
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<Assignment> createAssignment(
//            @RequestParam String name,
//            @RequestParam String deadline,
//            @RequestParam String question,
//            @RequestParam long subjectId) {
//        try {
//            System.out.println("Received deadline string: " + deadline);
//            System.out.println(name+" "+question);
//            // Validate and trim any extra whitespace or commas
//            String trimmedDeadline = deadline.split(",")[0].trim();
//            LocalDate localDate = LocalDate.parse(trimmedDeadline); // Expects yyyy-MM-dd format
//            
//            System.out.println("Parsed LocalDate: " + localDate);
//            
//            Subject subject = subjectService.getSubjectById(subjectId);
//
//            Assignment assignment = new Assignment();
//            assignment.setName(name);
//            assignment.setDeadline(localDate);
//            assignment.setQuestion(question);
//            assignment.setSubject(subject);
//
//            Assignment savedAssignment = assignmentService.saveAssignment(assignment);
//
//            return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
//        } catch (DateTimeParseException e) {
//            System.err.println("DateTimeParseException: " + e.getMessage());
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }
    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody AssignmentRequest request) {
        try {
            // Parse the deadline string into a LocalDate
            LocalDate localDate = LocalDate.parse(request.getDeadline());

            // Fetch the subject by its ID
            Subject subject = subjectService.getSubjectById(request.getSubjectId());

            // Create and populate the Assignment object
            Assignment assignment = new Assignment();
            assignment.setName(request.getName());
            assignment.setDeadline(localDate);
            assignment.setQuestion(request.getQuestion());
            assignment.setSubject(subject);

            // Save the assignment and return the response
            Assignment savedAssignment = assignmentService.saveAssignment(assignment);

            return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
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

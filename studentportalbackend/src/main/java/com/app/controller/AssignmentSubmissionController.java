//package com.app.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.entities.AssignmentSubmission;
//import com.app.service.AssignmentSubmissionService;
//
//@RestController
//@RequestMapping("/api/submissions")
//public class AssignmentSubmissionController {
//
//    @Autowired
//    private AssignmentSubmissionService assignmentSubmissionService;
//
//    @PostMapping
//    public AssignmentSubmission createSubmission(@RequestBody AssignmentSubmission submission) {
//        return assignmentSubmissionService.saveSubmission(submission);
//    }
//
//    @GetMapping("/assignment/{assignmentId}")
//    public List<AssignmentSubmission> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
//        return assignmentSubmissionService.getSubmissionsByAssignment(assignmentId);
//    }
//
//    @GetMapping("/student/{studentId}")
//    public List<AssignmentSubmission> getSubmissionsByStudent(@PathVariable Long studentId) {
//        return assignmentSubmissionService.getSubmissionsByStudent(studentId);
//    }
//}

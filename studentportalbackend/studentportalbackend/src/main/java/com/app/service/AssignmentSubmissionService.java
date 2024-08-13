package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AssignmentSubmissionRepository;
import com.app.entities.AssignmentSubmission;

@Service
public class AssignmentSubmissionService {

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    public AssignmentSubmission saveSubmission(AssignmentSubmission submission) {
        return assignmentSubmissionRepository.save(submission);
    }

    public List<AssignmentSubmission> getSubmissionsByAssignment(Long assignmentId) {
        return assignmentSubmissionRepository.findByAssignmentId(assignmentId);
    }

    public List<AssignmentSubmission> getSubmissionsByStudent(Long studentId) {
        return assignmentSubmissionRepository.findByAssignmentId(studentId);
    }
}

package com.app.controller;
//SubjectController.java

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SubjectDTO;
import com.app.entities.Subject;
import com.app.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;


    @GetMapping
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        List<SubjectDTO> subjects = subjectService.getAllSubjects();
       return ResponseEntity.ok(subjects);
    }
    @PostMapping
    public Subject addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }
    
    @GetMapping("/getSubjectsByDepartment")
    public ResponseEntity<List<SubjectDTO>> getSubjectsByDepartment(@RequestParam Long departmentId) {
        List<SubjectDTO> subjects = subjectService.getSubjectsByDepartment(departmentId);
        subjects.forEach(s->System.out.println(s.getName()));
        return ResponseEntity.ok(subjects);
    }
}
package com.app.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Timetable;
import com.app.service.TimetableService;

@RestController
@RequestMapping("/api/timetables")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @GetMapping("/dept/{dept}")
    public ResponseEntity<List<Timetable>> getTimetablesByDept(@PathVariable String dept) {
        List<Timetable> timetables = timetableService.getTimetablesByDept(dept);
        
        System.out.println(timetables.get(0).getTimetableImage());
        return ResponseEntity.ok(timetables);
    }
}

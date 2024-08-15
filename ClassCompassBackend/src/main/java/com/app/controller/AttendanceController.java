package com.app.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AttendanceDTO;
import com.app.entities.Attendance;
import com.app.service.AttendanceService;
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

//    @GetMapping
//    public ResponseEntity<List<AttendanceDTO>> getAllAttendances() {
//        List<AttendanceDTO> attendances = attendanceService.getAllAttendances();
//        return ResponseEntity.ok(attendances);
//    }
//
//    @PostMapping
//    public ResponseEntity<Void> uploadAttendance(
//            @RequestParam("departmentId") Long departmentId,
//            @RequestParam("subjectId") Long subjectId,
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("name") String name) {
//        try {
//            attendanceService.saveAttendance(departmentId, subjectId, file, name);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
//        try {
//            attendanceService.deleteAttendance(id);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }
    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendances() {
        List<AttendanceDTO> attendances = attendanceService.getAllAttendances();
        return ResponseEntity.ok(attendances);
    }

    @PostMapping
    public ResponseEntity<String> uploadAttendance(
            @RequestParam("departmentId") Long departmentId,
            @RequestParam("subjectId") Long subjectId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name) {
        try {
            attendanceService.saveAttendance(name,departmentId, subjectId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body("Attendance uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload attendance.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable Long id) {
        try {
            attendanceService.deleteAttendance(id);
            return ResponseEntity.ok("Attendance deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete attendance.");
        }
    }
    @GetMapping("/byDepartment/{id}")
    public ResponseEntity<List<?>> attendanceBydDepartment(@PathVariable Long id) {
            List<AttendanceDTO> list=attendanceService.getAttendanceByDepartment(id);
            if(list!=null)
            return ResponseEntity.ok(list);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(list);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadAttendance(@PathVariable Long id) {
        // Fetch the attendance record by ID
        Attendance attendance = attendanceService.getAttendanceById(id);
        System.out.println("Attendance ID: " + id);
        
        // Check if the attendance record was found
        if (attendance == null) {
            // Return a 404 Not Found status if the attendance record does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        System.out.println("Attendance file found: " + attendance.getFileName());
        
        // Create a ByteArrayResource from the attendance data
        ByteArrayResource resource = new ByteArrayResource(attendance.getData());
        
        // Set the content type based on the file type of the attendance record
        MediaType contentType = MediaType.parseMediaType(attendance.getFileType());
        
        // Build the response with the attendance content and appropriate headers
        return ResponseEntity.ok()
                .contentType(contentType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attendance.getFileName() + "\"")
                .body(resource);
    }
}

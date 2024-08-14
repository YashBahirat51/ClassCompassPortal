package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.AttendanceRepository;
import com.app.dao.DepartmentRepository;
import com.app.dao.SubjectRepository;
import com.app.dto.AttendanceDTO;
import com.app.entities.Attendance;
import com.app.entities.Department;
import com.app.entities.Subject;
//
//@Service
//public class AttendanceService {

//    @Autowired
//    private AttendanceRepository attendanceRepository;
//
//    @Autowired
//    private DepartmentRepository departmentRepository;
//
//    @Autowired
//    private SubjectRepository subjectRepository;
//
//    public List<AttendanceDTO> getAllAttendances() {
//        return attendanceRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
//    }
//
//    public void saveAttendance(Long departmentId, Long subjectId, MultipartFile file, String name) throws IOException {
//        Department department = departmentRepository.findById(departmentId).orElseThrow();
//        Subject subject = subjectRepository.findById(subjectId).orElseThrow();
//
//        Attendance attendance = new Attendance();
//        attendance.setFileName(name);
//        attendance.setFileType(file.getContentType());
//        attendance.setData(file.getBytes());
//        attendance.setDepartment(department);
//        attendance.setSubject(subject);
//        attendance.setUploadDate(LocalDate.now());
//
//        attendanceRepository.save(attendance);
//    }
//
//    public void deleteAttendance(Long id) {
//        attendanceRepository.deleteById(id);
//    }
//
//    private AttendanceDTO mapToDTO(Attendance attendance) {
//        AttendanceDTO dto = new AttendanceDTO();
//        dto.setId(attendance.getId());
//        dto.setFileName(attendance.getFileName());
//        dto.setFileType(attendance.getFileType());
//        dto.setDepartmentName(attendance.getDepartment().getName());
//        dto.setSubjectName(attendance.getSubject().getName());
//        dto.setUploadDate(attendance.getUploadDate());
//        return dto;
//    }

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public List<AttendanceDTO> getAllAttendances() {
        return attendanceRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public void saveAttendance(Long departmentId, Long subjectId, MultipartFile file, String name) throws IOException {
        Department department = departmentRepository.findById(departmentId).orElseThrow();
        Subject subject = subjectRepository.findById(subjectId).orElseThrow();

        Attendance attendance = new Attendance();
        attendance.setFileName(name);
        attendance.setFileType(file.getContentType());
        attendance.setData(file.getBytes());
        attendance.setDepartment(department);
        attendance.setSubject(subject);
        attendance.setUploadDate(LocalDate.now());
        
        attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    private AttendanceDTO mapToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(attendance.getId());
        dto.setFileName(attendance.getFileName());
        dto.setFileType(attendance.getFileType());
        dto.setDepartmentName(attendance.getDepartment().getName());
        dto.setSubjectName(attendance.getSubject().getName());
        dto.setUploadDate(attendance.getUploadDate());
        return dto;
    }
}

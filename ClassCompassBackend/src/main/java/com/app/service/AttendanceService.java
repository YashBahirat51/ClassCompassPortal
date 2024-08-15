//package com.app.service;
//
//import java.io.IOException;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.app.dao.AttendanceRepository;
//import com.app.dao.DepartmentRepository;
//import com.app.dao.SubjectRepository;
//import com.app.dto.AttendanceDTO;
//import com.app.entities.Attendance;
//import com.app.entities.Department;
//import com.app.entities.Subject;
//import com.app.mapper.AttendanceMapper;
////
////@Service
////public class AttendanceService {
//
////    @Autowired
////    private AttendanceRepository attendanceRepository;
////
////    @Autowired
////    private DepartmentRepository departmentRepository;
////
////    @Autowired
////    private SubjectRepository subjectRepository;
////
////    public List<AttendanceDTO> getAllAttendances() {
////        return attendanceRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
////    }
////
////    public void saveAttendance(Long departmentId, Long subjectId, MultipartFile file, String name) throws IOException {
////        Department department = departmentRepository.findById(departmentId).orElseThrow();
////        Subject subject = subjectRepository.findById(subjectId).orElseThrow();
////
////        Attendance attendance = new Attendance();
////        attendance.setFileName(name);
////        attendance.setFileType(file.getContentType());
////        attendance.setData(file.getBytes());
////        attendance.setDepartment(department);
////        attendance.setSubject(subject);
////        attendance.setUploadDate(LocalDate.now());
////
////        attendanceRepository.save(attendance);
////    }
////
////    public void deleteAttendance(Long id) {
////        attendanceRepository.deleteById(id);
////    }
////
////    private AttendanceDTO mapToDTO(Attendance attendance) {
////        AttendanceDTO dto = new AttendanceDTO();
////        dto.setId(attendance.getId());
////        dto.setFileName(attendance.getFileName());
////        dto.setFileType(attendance.getFileType());
////        dto.setDepartmentName(attendance.getDepartment().getName());
////        dto.setSubjectName(attendance.getSubject().getName());
////        dto.setUploadDate(attendance.getUploadDate());
////        return dto;
////    }
//
//@Service
//public class AttendanceService {
//
//    @Autowired
//    private AttendanceRepository attendanceRepository;
//
//    @Autowired
//    private DepartmentRepository departmentRepository;
//
//    @Autowired
//    private SubjectRepository subjectRepository;
//    @Autowired
//    private AttendanceMapper mapper;
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
//
//	public List<AttendanceDTO> attendanceBydDepartment(Long id) {
//		
//		return attendanceRepository.findByDepartmentId(id).stream().map(mapper::toDTO).collect(Collectors.toList());
//	
//	}
//	public Attendance getAttendanceById(Long id) {
//        return attendanceRepository.findById(id).orElse(null);
//    }
//}
package com.app.service;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.AttendanceRepository;
import com.app.dto.AttendanceDTO;
import com.app.entities.Attendance;
import com.app.entities.Department;
import com.app.entities.Resource;
import com.app.entities.Subject;
import com.app.mapper.AttendanceMapper;
import com.app.service.DepartmentService;
import com.app.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private AttendanceMapper mapper;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private SubjectService subjectService;

    public Attendance saveAttendance(String name, Long subjectId, Long departmentId, MultipartFile file) throws Exception {
    	String filename=StringUtils.cleanPath(file.getOriginalFilename());
    	if(filename.contains(".."))
		{
			throw new Exception("file name contains inva;id sequesnce");
		}
    	 
    			Department department = departmentService.getDeptById(departmentId);
        Subject subject = subjectService.getSubjectById(subjectId);

        Attendance attendance = new Attendance(filename, file.getContentType(), file.getBytes(), department, subject, LocalDate.now());

        return attendanceRepository.save(attendance);
    }

    public List<AttendanceDTO> getAttendanceByDepartment(Long departmentId) {
        List<Attendance> attendances = attendanceRepository.findByDepartmentId(departmentId);
        return attendances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceBySubject(Long subjectId) {
        List<Attendance> attendances = attendanceRepository.findBySubjectId(subjectId);
        return attendances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AttendanceDTO convertToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(attendance.getId());
        dto.setFileName(attendance.getFileName());
        dto.setFileType(attendance.getFileType());
        dto.setDepartmentName(attendance.getDepartment().getName());
        dto.setSubjectName(attendance.getSubject().getName());
        dto.setUploadDate(attendance.getUploadDate());
        return dto;
    }

    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }
    
    public Attendance getAttachment(Long fileid) {
		// TODO Auto-generated method stub
		
		return attendanceRepository.findById(fileid).orElse(null);
	}

	public Attendance getAttendanceById(Long id) {
		// TODO Auto-generated method stub
		return attendanceRepository.findById(id).orElseThrow();
	}

	public List<AttendanceDTO> getAllAttendances() {
		// TODO Auto-generated method stub
		return attendanceRepository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
		
	}
}

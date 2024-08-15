package com.app.mapper;

import org.springframework.stereotype.Component;

import com.app.dto.AttendanceDTO;
import com.app.entities.Attendance;

@Component
public class AttendanceMapper {

	
	public AttendanceDTO toDTO(Attendance attendance)
	{
		
		AttendanceDTO dto=new AttendanceDTO();
		dto.setId(attendance.getId());
		dto.setFileName(attendance.getFileName());
		dto.setDepartmentName(attendance.getDepartment().getName());
		dto.setFileType(attendance.getFileType());
		dto.setSubjectName(attendance.getSubject().getName());
		dto.setUploadDate(attendance.getUploadDate());
		return dto;
	}
	
}

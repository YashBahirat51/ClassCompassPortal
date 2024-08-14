package com.app.mapper;

import org.springframework.stereotype.Component;

import com.app.dto.SubjectDTO;
import com.app.entities.Subject;

@Component
public class SubjectMapper {

	
	public SubjectDTO toDTO(Subject subject)
	{
		
		
		SubjectDTO dto=new SubjectDTO();
		dto.setId(subject.getId());
		dto.setName(subject.getName());
		dto.setDepartmentName(subject.getDepartment().getName());
		return dto;
	}
}

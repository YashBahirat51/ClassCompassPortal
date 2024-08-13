package com.app.mapper;

import org.springframework.stereotype.Component;

import com.app.dto.AssignmentDTO;
import com.app.entities.Assignment;
@Component
public class AssignmentMapper {

	
	public AssignmentDTO toDTO(Assignment assignmnet)
	{
		
		AssignmentDTO dto=new AssignmentDTO();
		
		dto.setId(assignmnet.getId());
		dto.setName(assignmnet.getName());
		dto.setDeadline(assignmnet.getDeadline());
		dto.setQuestion(assignmnet.getQuestion());
		dto.setSubjectId(assignmnet.getSubject().getId());
		dto.setSubjectName(assignmnet.getSubject().getName());
		
		return dto;
				
	}
}

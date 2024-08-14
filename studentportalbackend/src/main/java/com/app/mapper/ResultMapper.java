package com.app.mapper;

import org.springframework.stereotype.Component;

import com.app.dto.ResultDTO;
import com.app.entities.Result;

@Component
public class ResultMapper {

	
	public ResultDTO toDTO(Result result )
	{
		ResultDTO dto=new ResultDTO();
		dto.setId(result.getId());
		dto.setFileName(result.getFileName());
		dto.setFileType(result.getFileType());
		dto.setName(result.getName());
		dto.setSubjectId(result.getSubject().getId());
		dto.setUploadDate(result.getUploadDate());
//		dto.setSubjectName(result.getSubject().getName());
		return dto;
	}
}

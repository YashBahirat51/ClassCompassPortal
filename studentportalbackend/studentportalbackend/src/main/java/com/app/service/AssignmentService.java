package com.app.service;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.app.dao.AssignmentRepository;
import com.app.dto.AssignmentDTO;
import com.app.entities.Assignment;
import com.app.mapper.AssignmentMapper;


@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    ModelMapper mapper;
    @Autowired
    AssignmentMapper assignmentMapper;
    
    public Assignment saveAssignment(Assignment assignment) {
 
        return assignmentRepository.save(assignment);
    }
    
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

	public void deleteAssignment(Long id) {
		assignmentRepository.deleteById(id);
		
	}
	public List<AssignmentDTO> getAssignmentsByDepartment(Long departmentId) {
         List<Assignment> assignments=assignmentRepository.findBySubjectDepartmentId(departmentId);
		return assignments.stream().map(assi->assignmentMapper.toDTO(assi)
				).collect(Collectors.toList());
        
         
	}
}

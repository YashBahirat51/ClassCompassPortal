package com.app.service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.app.dao.AssignmentRepository;
import com.app.dto.AssignmentDTO;
import com.app.dto.AssignmentRequest;
import com.app.entities.Assignment;
import com.app.entities.Subject;
import com.app.mapper.AssignmentMapper;


@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    SubjectService service;
    
    @Autowired
    ModelMapper mapper;
    @Autowired
    AssignmentMapper assignmentMapper;
    
    public Assignment saveAssignment(Assignment assignment) {
 
        return assignmentRepository.save(assignment);
    }
    
    public List<AssignmentDTO> getAllAssignments() {
        return assignmentRepository.findAll()
        		.stream().map(assi->assignmentMapper.toDTO(assi)).collect(Collectors.toList());
        
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
	
	public AssignmentDTO createAssignment(AssignmentRequest request)
	{
		 LocalDate localDate = LocalDate.parse(request.getDeadline());

         // Fetch the subject by its ID
         Subject subject =service.getSubjectById(request.getSubjectId());

         // Create and populate the Assignment object
         Assignment assignment = new Assignment();
         assignment.setName(request.getName());
         assignment.setDeadline(localDate);
         assignment.setQuestion(request.getQuestion());
         assignment.setSubject(subject);

         // Save the assignment and return the response
         Assignment savedAssignment = saveAssignment(assignment);
        return mapper.map(savedAssignment, AssignmentDTO.class);
	}
}

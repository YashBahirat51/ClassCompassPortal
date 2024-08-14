package com.app.service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SubjectRepository;
import com.app.dto.SubjectDTO;
import com.app.entities.Subject;
import com.app.mapper.DepartmentMapper;
import com.app.mapper.SubjectMapper;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    DepartmentMapper departmentMapper;
    @Autowired
    SubjectMapper mapper;
    
    @Autowired
    private ModelMapper modelMapper; // Or use manual mapping
  
    public List<SubjectDTO> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return subjects.stream()
                .map(subject ->mapper.toDTO(subject))
                .collect(Collectors.toList());
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }


   
    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
    public List<SubjectDTO> getSubjectsByDepartment(Long departmentId) {
        List<Subject> subjects = subjectRepository.findByDepartmentId(departmentId);
//        return subjects.stream().map(subject -> modelMapper.map(subjects, SubjectDTO.class)).collect(Collectors.toList());

        List<SubjectDTO> subjectDtos = subjects.stream()
            .map(departmentMapper::toDTO)
            .collect(Collectors.toList());

        return subjectDtos;
    }

	public Optional<Subject> findById(Long subjectId) {
		// TODO Auto-generated method stub
		return subjectRepository.findById(subjectId);
	}
    
}
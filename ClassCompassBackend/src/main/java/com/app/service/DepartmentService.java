package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.DepartmentRepository;
import com.app.dto.DepartmentDTO;
import com.app.entities.Department;
import com.app.mapper.DepartmentMapper;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    ModelMapper mapper;
    @Autowired
    DepartmentMapper departmentMapper;
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream().map(dept->departmentMapper.toDTO(dept)).collect(Collectors.toList());
    }

//    public Department getDepartmentById(Long id) {
//        return departmentRepository.findById(id).orElse(null);
//    }

    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id).orElse(null);
        
		return departmentMapper.toDTO(department);
    }
}


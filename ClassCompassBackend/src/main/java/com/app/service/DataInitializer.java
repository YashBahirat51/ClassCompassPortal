package com.app.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.dao.DepartmentRepository;
import com.app.dao.SubjectRepository;
import com.app.entities.Admin;
import com.app.entities.Department;
import com.app.entities.Role;
import com.app.entities.Subject;

@Service
public class DataInitializer {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @PostConstruct
    public void init() {
        // Initialize Admins
        if (adminRepository.count() == 0) {
            adminRepository.save(new Admin("admin1", "admin1", "admin1@gmail.com", passwordEncoder.encode("admin1"), Role.ROLE_ADMIN));
            adminRepository.save(new Admin("admin2", "admin1", "admin2@gmail.com", passwordEncoder.encode("admin1"), Role.ROLE_ADMIN));
            System.out.println("Admin data initialized.");
        }

        // Initialize Departments and Subjects
        if (departmentRepository.count() == 0) {
            initializeDepartmentsAndSubjects();
            System.out.println("Departments and Subjects initialized.");
        }
    }

    private void initializeDepartmentsAndSubjects() {
        // Initialize Departments
        Department dac = new Department("DAC", "DAC Head");
        Department desd = new Department("DESD", "DESD Head");
        Department dbda = new Department("DBDA", "DESD Head");
        Department ditiss = new Department("DITISS", "DITISS Head");
        departmentRepository.save(dac);
        departmentRepository.save(desd);
        departmentRepository.save(dbda);
        departmentRepository.save(ditiss);

        // Initialize Subjects (linked with Departments)
        subjectRepository.save(new Subject("CPP", departmentRepository.findByName("DAC")));
        subjectRepository.save(new Subject("OS", departmentRepository.findByName("DAC")));
        subjectRepository.save(new Subject("SQL", departmentRepository.findByName("DAC")));
        subjectRepository.save(new Subject("JAVA" ,departmentRepository.findByName("DAC")));
        subjectRepository.save(new Subject("Embedded",  departmentRepository.findByName("DESD")));
        subjectRepository.save(new Subject("Embedded2",  departmentRepository.findByName("DESD")));
        subjectRepository.save(new Subject("Big Data",  departmentRepository.findByName("DESD")));
        subjectRepository.save(new Subject("Data Mining",  departmentRepository.findByName("DBDA")));
        subjectRepository.save(new Subject("Network Security",  departmentRepository.findByName("DBDA")));
        subjectRepository.save(new Subject("Cyber Forensics",  departmentRepository.findByName("DBDA")));

        // Add more departments and subjects as needed...
    }
}

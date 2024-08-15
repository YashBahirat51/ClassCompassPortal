package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.dao.StudentRepository;
import com.app.entities.Admin;
import com.app.entities.Student;

@Service
public class PasswordUpdateService {

    @Autowired
    private StudentRepository studenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateAllPasswords() {
        List<Student> admins = studenRepository.findAll();
        for (Student admin : admins) {
            if (admin.getPassword() != null && !admin.getPassword().startsWith("$2a$")) { // Check if already encoded
                String rawPassword = admin.getPassword();
                String encodedPassword = passwordEncoder.encode(rawPassword);
                admin.setPassword(encodedPassword);
                studenRepository.save(admin);
            }
            
        }
       System.out.println(" password updated succesfully");
    }
}

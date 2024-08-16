package com.app.service;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.entities.Admin;
import com.app.entities.Role;

@Service
public class DataInitializer {

	
	@Autowired
	PasswordEncoder passwordEncoder;
    @Autowired
    private AdminRepository adminRepository;

    @PostConstruct
    public void init() {
        // Check if admins are already present
        if (adminRepository.count() == 0) {
        	adminRepository.save(new Admin("admin1", "admin1","admin1@gmail.com", passwordEncoder.encode("admin1"),Role.ROLE_ADMIN));
            adminRepository.save(new Admin("admin2", "admin1", "admin2@gmail.com" , passwordEncoder.encode("admin1"),Role.ROLE_ADMIN));
             System.out.println("Admin data initialized.");
        }
    }
}
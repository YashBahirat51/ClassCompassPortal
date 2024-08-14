package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.entities.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Remove the PasswordEncoder field and related logic
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    public Admin saveAdmin(Admin admin) {
        // Assuming you want to save the plain password
        // If you want to still encode passwords, consider using another library or custom encoding
        return adminRepository.save(admin);
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}

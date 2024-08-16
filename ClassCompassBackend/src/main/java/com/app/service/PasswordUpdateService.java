package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.StudentRepository;
import com.app.entities.Student;

@Service
class PasswordUpdateService {

    @Autowired
 private StudentRepository  studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateAllPasswords() {
        List<Student> student = studentRepository.findAll();
        for (Student student1 : student) {
            if (student1.getPassword() != null && !student1.getPassword().startsWith("$2a$")) { // Check if already encoded
                String rawPassword = student1.getPassword();
                String encodedPassword = passwordEncoder.encode(rawPassword);
                student1.setPassword(encodedPassword);
                studentRepository.save(student1);
            }
            
        }
       System.out.println(" password updated succesfully");
    }
}
//package com.app.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.app.dao.AdminRepository;
//import com.app.entities.Admin;
//
//@Service
//class PasswordUpdateService {
//
//    @Autowired
// private AdminRepository  adminRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void updateAllPasswords() {
//        List<Admin> admins = adminRepository.findAll();
//        for (Admin admin : admins) {
//            if (admin.getPassword() != null && !admin.getPassword().startsWith("$2a$")) { // Check if already encoded
//                String rawPassword = admin.getPassword();
//                String encodedPassword = passwordEncoder.encode(rawPassword);
//                admin.setPassword(encodedPassword);
//                adminRepository.save(admin);
//            }
//            
//        }
//       System.out.println(" password updated succesfully");
//    }
//}

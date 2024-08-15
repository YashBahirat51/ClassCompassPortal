//package com.app.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.app.dao.StudentRepository;
//import com.app.entities.Student;
//import com.app.model.CustomUserDetails;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private StudentRepository studentRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Student student = studentRepository.findByEmail(email);
//        if (student == null) {
//            throw new UsernameNotFoundException("User not found");
//        }
//        return new CustomUserDetails(student);
//    }
//}

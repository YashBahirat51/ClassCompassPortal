package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.entities.Admin;
import com.app.entities.Student;
import com.app.service.AdminService;
import com.app.service.StudentService;

//@Service
//@Transactional
//public class CustomUserDetailsService implements UserDetailsService {
//	// dep : dao layer
//	@Autowired
//	private StudentRepository userDao;
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		Student user = userDao.findByEmail(email);
////				.orElseThrow(() -> new UsernameNotFoundException("Email not found!!!!"));
//		return new CustomUserDetails(user);
//	}
//
//}
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdminService adminService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentService.getStudentByEmail(username);
        if (student != null) {
            return new CustomUserDetails(student);
        }

        Admin admin = adminService.getAdminByEmail(username);
        if (admin != null) {
            return new CustomUserDetails(admin);
        }

        throw new UsernameNotFoundException("User not found");
    }
}
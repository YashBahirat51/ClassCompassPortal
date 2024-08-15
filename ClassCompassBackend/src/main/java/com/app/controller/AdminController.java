package com.app.controller;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SigninResponse;
import com.app.dto.TimetableDTO;
import com.app.entities.Admin;
import com.app.entities.Notice;
import com.app.security.JwtUtils;
import com.app.service.AdminService;
import com.app.service.AttendanceService;
import com.app.service.FacultyService;
import com.app.service.NoticeService;
import com.app.service.StudentService;
import com.app.service.TimetableService;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private TimetableService timetableService;

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
   	private JwtUtils utils;

   	@Autowired
   	private AuthenticationManager mgr;

    @GetMapping("/notices")
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        return ResponseEntity.ok(notices);
    }

    @PostMapping("/notices")
    public ResponseEntity<Notice> registerNotice(@RequestBody Notice notice) {
        try {
            Notice savedNotice = noticeService.saveNotice(notice);
            return ResponseEntity.ok(savedNotice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/notices/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) {
        Optional<Notice> notice = noticeService.getNoticeById(id);
        return notice.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadTimetable(
            @RequestParam("timetableImage") MultipartFile timetableImage,
            @RequestParam("dept") String dept,
            @RequestParam("postingDate") String postingDate) {

        try {
            LocalDate date = LocalDate.parse(postingDate);
            timetableService.saveTimetable(timetableImage, dept, date);
            return ResponseEntity.ok("Timetable uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload timetable");
        }
    }

    @GetMapping("/timetables")
    public ResponseEntity<List<TimetableDTO>> getAllTimetables() {
        List<TimetableDTO> timetables = timetableService.getAllTimetables();
        return ResponseEntity.ok(timetables);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Admin admin, HttpServletResponse response) {
//        Admin existingAdmin = adminService.getAdminByEmail(admin.getEmail());
//        if (existingAdmin != null && passwordEncoder.matches(admin.getPassword(), existingAdmin.getPassword())) {
//            String token = jwtUtil.generateToken(existingAdmin.getEmail());
//
//            Cookie cookie = new Cookie("jwt", token);
//            cookie.setHttpOnly(true);
//            cookie.setSecure(false); // Set to true in production with HTTPS
//            cookie.setPath("/");
//            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
//            response.addCookie(cookie);
//
//            // Manually set SameSite=None attribute by modifying the header
//            response.addHeader("Set-Cookie", cookie.getName() + "=" + cookie.getValue() +
//                    "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=" + cookie.getMaxAge());
//
//            // Convert the Student entity to StudentDTO
//         
//            return ResponseEntity.ok(new SigninResponse(token,"succesfull login"));
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin adminDTO, HttpServletResponse response) {
        // Authenticate the admin
        Authentication verifiedAuth = mgr.authenticate(
                new UsernamePasswordAuthenticationToken(adminDTO.getEmail(), adminDTO.getPassword()));
        
        // Generate JWT token
        String jwtToken = utils.generateJwtToken(verifiedAuth);

        // Create a cookie to store the JWT token
        Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
        jwtCookie.setHttpOnly(true); // Make it inaccessible to JavaScript for security
        jwtCookie.setSecure(true); // Ensure the cookie is sent over HTTPS
        jwtCookie.setPath("/"); // Set the path where the cookie is valid
        jwtCookie.setMaxAge(7 * 24 * 60 * 60); // Set cookie expiration (7 days)

        // Add the cookie to the response
        response.addCookie(jwtCookie);

        // Fetch the admin details
        Admin admin = adminService.getAdminByEmail(adminDTO.getEmail());

        // Check if the admin exists and return the DTO
        if (admin != null && passwordEncoder.matches(adminDTO.getPassword(), admin.getPassword())) {
            // Return success response
            return ResponseEntity.ok(new SigninResponse(jwtToken,"Succesfull Signin"));
        } else {
            // Return unauthorized status if authentication fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        try {
            admin.setPassword(passwordEncoder.encode(admin.getPassword())); // Ensure passwords are encoded
            Admin savedAdmin = adminService.saveAdmin(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
        Admin admin = adminService.getAdminByEmail(email);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/timetables/{id}")
    public ResponseEntity<?> deleteTimetable(@PathVariable Long id) {
        boolean isDeleted = timetableService.deleteTimetableById(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timetable not found");
    }
}

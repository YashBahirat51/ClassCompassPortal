package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.NoticeDTO;
import com.app.entities.Notice;
import com.app.service.NoticeService;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/all")
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @PostMapping("/register")
    public ResponseEntity<Notice> registerNotice(@RequestBody Notice notice) {
        Notice savedNotice = noticeService.saveNotice(notice);
        return ResponseEntity.ok(savedNotice);
    }
    @GetMapping("byDepartment/{department}")
    public List<NoticeDTO> getNoticesByDepartment(@PathVariable String department) {
        return noticeService.getNoticesByDepartment(department);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable Long id) {
        try {
            noticeService.deleteNoticeById(id);
            return ResponseEntity.ok("Notice deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
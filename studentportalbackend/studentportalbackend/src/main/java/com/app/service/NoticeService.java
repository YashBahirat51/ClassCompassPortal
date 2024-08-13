package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.NoticeRepository;
import com.app.dto.NoticeDTO;
import com.app.entities.Notice;

@Service
public class NoticeService {


    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public Optional<Notice> getNoticeById(Long id) {
        return noticeRepository.findById(id);
    }

	
	 public List<NoticeDTO> getNoticesByDepartment(String departmentName) {
	        List<Notice> notices = noticeRepository.findByDepartment(departmentName);
	        return notices.stream().map(this::convertToDTO).collect(Collectors.toList());
	    }

	    private NoticeDTO convertToDTO(Notice notice) {
	        NoticeDTO noticeDTO = new NoticeDTO();
	        noticeDTO.setId(notice.getId());
	        noticeDTO.setDate(notice.getDate());
	        noticeDTO.setNotice(notice.getNotice());
	        noticeDTO.setDepartment(notice.getDepartment());
	        return noticeDTO;
	    }
}
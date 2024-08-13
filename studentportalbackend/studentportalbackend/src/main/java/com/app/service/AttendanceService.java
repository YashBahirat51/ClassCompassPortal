package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AttendanceRepository;
import com.app.entities.Attendance;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> saveAllAttendances(List<Attendance> attendances) {
        return attendanceRepository.saveAll(attendances);
    }
    
}

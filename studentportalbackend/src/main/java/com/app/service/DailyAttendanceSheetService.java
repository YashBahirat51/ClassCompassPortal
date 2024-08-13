package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.DailyAttendanceSheetRepository;
import com.app.entities.Attendance;
import com.app.entities.DailyAttendanceSheet;

@Service
public class DailyAttendanceSheetService {

    @Autowired
    private DailyAttendanceSheetRepository dailyAttendanceSheetRepository;

    public DailyAttendanceSheet createOrUpdateDailySheet(LocalDate date, List<Attendance> attendances) {
        DailyAttendanceSheet dailySheet = dailyAttendanceSheetRepository.findByDate(date);
        if (dailySheet == null) {
            dailySheet = new DailyAttendanceSheet();
            dailySheet.setDate(date);
        }
        dailySheet.setAttendances(attendances);
        return dailyAttendanceSheetRepository.save(dailySheet);
    }
}
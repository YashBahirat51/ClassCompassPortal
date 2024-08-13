package com.app.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @NotNull
    @Column(name = "status")
    private Boolean status; // true for present, false for absent

    @ManyToOne
    @JoinColumn(name = "daily_attendance_sheet_id", nullable = false)
    private DailyAttendanceSheet dailyAttendanceSheet;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public DailyAttendanceSheet getDailyAttendanceSheet() {
        return dailyAttendanceSheet;
    }

    public void setDailyAttendanceSheet(DailyAttendanceSheet dailyAttendanceSheet) {
        this.dailyAttendanceSheet = dailyAttendanceSheet;
    }
}

package com.app.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "timetables")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dept", nullable = false)
    private String dept;

    @Column(name = "posting_date", nullable = false)
    private LocalDate postingDate;

    @Lob
    @Column(name = "timetable_image", nullable = false)
    private byte[] timetableImage;

    public Timetable() {
    }

    public Timetable(String dept, LocalDate postingDate, byte[] timetableImage) {
        this.dept = dept;
        this.postingDate = postingDate;
        this.timetableImage = timetableImage;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public LocalDate getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(LocalDate postingDate) {
        this.postingDate = postingDate;
    }

    public byte[] getTimetableImage() {
        return timetableImage;
    }

    public void setTimetableImage(byte[] timetableImage) {
        this.timetableImage = timetableImage;
    }
}

package com.app.dto;

public class TimetableDTO {
    private Long id; // Change to Long to match the database type
    private String dept;
    private String postingDate;
    private String imageData;

    public TimetableDTO(Long id, String dept, String postingDate, String imageData) {
        this.id = id;
        this.dept = dept;
        this.postingDate = postingDate;
        this.imageData = imageData;
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

    public String getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(String postingDate) {
        this.postingDate = postingDate;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
}

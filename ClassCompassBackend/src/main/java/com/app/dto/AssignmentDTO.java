package com.app.dto;

import java.time.LocalDate;

public class AssignmentDTO {
    private Long id;
    private String name;
    private String question;
    private LocalDate deadline;
    private Long subjectId;
    private String subjectName;
	public Long getSubjectId() {
		return subjectId;
	}
	
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public LocalDate getDeadline() {
		return deadline;
	}
	public void setDeadline(LocalDate localDate) {
		this.deadline = localDate;
	}
	public void setSubjectId(Long subjectId) {
		this.subjectId=subjectId;
	}

    // Getters and setters
}


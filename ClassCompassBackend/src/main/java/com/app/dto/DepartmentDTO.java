package com.app.dto;

import java.util.Set;

// DepartmentDTO.java
public class DepartmentDTO {
    private Long id;
    private String name;
    private String head;
    private Set<StudentDTO> students;
    private Set<SubjectDTO> subjects;
    private Set<FacultyDTO> faculties;
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
	public String getHead() {
		return head;
	}
	public void setHead(String head) {
		this.head = head;
	}
	public Set<StudentDTO> getStudents() {
		return students;
	}
	public void setStudents(Set<StudentDTO> students) {
		this.students = students;
	}
	public Set<SubjectDTO> getSubjects() {
		return subjects;
	}
	public void setSubjects(Set<SubjectDTO> subjects) {
		this.subjects = subjects;
	}
	public Set<FacultyDTO> getFaculties() {
		return faculties;
	}
	public void setFaculties(Set<FacultyDTO> faculties) {
		this.faculties = faculties;
	}

    // Getters and Setters
}

// StudentDTO.java

package com.app.dto;

import java.io.Serializable;

public class StudentDTO implements Serializable{
    private Long id;
    private String prnno;
    private String fname;
    private String lname;
    private String email;
    private byte[] image;
    private String password;
    private String departmentName;
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public StudentDTO() {
		// TODO Auto-generated constructor stub
	}
	public StudentDTO(String prnno2, String fname2, String lname2, String email2, String password2, byte[] image2) {
		// TODO Auto-generated constructor stub
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String pasword) {
		this.password = pasword;
	}
	private Long department;
	public Long getDepartment() {
		return department;
	}
	public void setDepartment(Long department) {
		this.department = department;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPrnno() {
		return prnno;
	}
	public void setPrnno(String prnno) {
		this.prnno = prnno;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] bs) {
		this.image = bs;
	}

    // Getters and Setters
}

// SubjectDTO.java

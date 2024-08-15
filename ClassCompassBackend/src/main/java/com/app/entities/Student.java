package com.app.entities;

import java.util.Collection;
import java.util.Collections;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.app.security.CustomUser;

@Entity
@Table(name = "students")
public class Student implements CustomUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String prnno;

    @Enumerated(EnumType.STRING)
    private Role role; // Use the Role enum here

    
   

	public String getRole() {
		return role.toString();
	}
	public void setRole(Role role) {
		this.role = role;
	}

	@NotBlank
    @Size(min = 2, max = 50)
    private String fname;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lname;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    private String password;

    @Lob
    private byte[] image;
    public Student(String prnno2, String fname2, String lname2, String email2, String password2, byte[] image2) {
		// TODO Auto-generated constructor stub
	}

	public Student() {
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    // Getters and Setters
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

}

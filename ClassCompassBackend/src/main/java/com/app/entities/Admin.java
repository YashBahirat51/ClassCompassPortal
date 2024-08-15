package com.app.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.app.security.CustomUser;

@Entity
@Table(name = "admins")
public class Admin implements CustomUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "first_name")
    private String fname;

    @NotBlank
    @Size(max = 50)
    @Column(name = "last_name")
    private String lname;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Use the Role enum here

    
   

	public String getRole() {
		return role.toString();
	}

	public void setRole(Role role) {
		this.role = role;
	}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

}

package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "resources")
public class Resource {
	 @Id
	    @GeneratedValue(generator = "UUID")
	    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
	    @Column(updatable = false, nullable = false)
	    private String id;

    private String filename; // Name of the resource

    private String fileType; // Type of the resource (e.g., PDF, Book, etc.)

    @Lob
    private byte[] data; // File data

   

	public Resource(String filename, String contentType, byte[] bytes,Subject subject) {
		this.filename=filename;
		fileType=contentType;
		data=bytes;
		this.subject=subject;
	}



	public Resource() {
		// TODO Auto-generated constructor stub
	}



	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}



	public String getFilename() {
		return filename;
	}



	public void setFilename(String filename) {
		this.filename = filename;
	}



	public String getFileType() {
		return fileType;
	}



	public void setFileType(String fileType) {
		this.fileType = fileType;
	}



	public byte[] getData() {
		return data;
	}



	public void setData(byte[] data) {
		this.data = data;
	}



	public Subject getSubject() {
		return subject;
	}



	public void setSubject(Subject subject) {
		this.subject = subject;
	}



	@ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // Getters and Setters
}

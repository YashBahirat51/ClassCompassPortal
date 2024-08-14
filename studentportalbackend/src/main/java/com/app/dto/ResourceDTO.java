package com.app.dto;
public class ResourceDTO {
   
	
	private String id;
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getDownloadURL() {
		return downloadURL;
	}


	public void setDownloadURL(String downloadURL) {
		this.downloadURL = downloadURL;
	}
	private String fileName;
	 private String downloadURL;
    private String fileType;
    private long filesize;
    private String subjectName; // For displaying subject name
 
    public long getFilesize() {
		return filesize;
	}


	public ResourceDTO() {
		super();
	}


	public ResourceDTO(String fileName, String downloadURL, String fileType, long filesize, String subjectName) {
		super();
		this.fileName = fileName;
		this.downloadURL = downloadURL;
		this.fileType = fileType;
		this.filesize = filesize;
		this.subjectName = subjectName;
	}

    public ResourceDTO(String id, String filename, String fileType, String subjectName) {
        this.id = id;
        this.fileName = filename;
        this.fileType = fileType;
        this.subjectName = subjectName;
    }

	public void setFilesize(long filesize) {
		this.filesize = filesize;
	}
	
	
	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getFileType() {
		return fileType;
	}


	public void setFileType(String fileType) {
		this.fileType = fileType;
	}


	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	
    // Getters and Setters
}

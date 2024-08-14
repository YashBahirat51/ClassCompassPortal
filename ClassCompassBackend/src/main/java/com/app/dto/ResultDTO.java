package com.app.dto;

import java.time.LocalDate;

public class ResultDTO {

    private Long id;
    private String name;
    private String fileName;
    private String fileType;
    private LocalDate uploadDate;
    private Long subjectId;
    private String subjectName; // Assuming subjectId will be passed

    public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public ResultDTO() {
    }

    public ResultDTO(Long id, String name, String fileName, String fileType, LocalDate uploadDate, Long subjectId) {
        this.id = id;
        this.name = name;
        this.fileName = fileName;
        this.fileType = fileType;
        this.uploadDate = uploadDate;
        this.subjectId = subjectId;
    }

    // Getters and Setters
//    result.getName(), result.getFileName(),result.getSubject().getName(), result.getSubject().getId(), result.getUploadDate()))
    public ResultDTO toDTO(String name2, String fileName2, String SubjectName,Long subjectId, LocalDate uploadDate2) {
		ResultDTO dto=new ResultDTO(); 
		dto.setName(name);
		dto.setFileName(fileName2);
		dto.setSubjectName(subjectName);
		dto.setSubjectId(subjectId);
		dto.setUploadDate(uploadDate2);

		return dto;
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

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }
}

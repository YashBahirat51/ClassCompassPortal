//package com.app.entities;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "assignment_submissions")
//public class AssignmentSubmission {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "student_id", nullable = false)
//    private Student student;
//
//    public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public Student getStudent() {
//		return student;
//	}
//
//	public void setStudent(Student student) {
//		this.student = student;
//	}
//
//	public Assignment getAssignment() {
//		return assignment;
//	}
//
//	public void setAssignment(Assignment assignment) {
//		this.assignment = assignment;
//	}
//
//	public boolean isSubmitted() {
//		return submitted;
//	}
//
//	public void setSubmitted(boolean submitted) {
//		this.submitted = submitted;
//	}
//
//	public byte[] getSubmittedFile() {
//		return submittedFile;
//	}
//
//	public void setSubmittedFile(byte[] submittedFile) {
//		this.submittedFile = submittedFile;
//	}
//
//	public LocalDateTime getSubmissionTime() {
//		return submissionTime;
//	}
//
//	public void setSubmissionTime(LocalDateTime submissionTime) {
//		this.submissionTime = submissionTime;
//	}
//
//	@ManyToOne
//    @JoinColumn(name = "assignment_id", nullable = false)
//    private Assignment assignment;
//
//    @Column(name = "submitted", nullable = false)
//    private boolean submitted;
//
//    @Lob
//    private byte[] submittedFile;
//
//    @Column(name = "submission_time")
//    private LocalDateTime submissionTime;
//
//   
//}

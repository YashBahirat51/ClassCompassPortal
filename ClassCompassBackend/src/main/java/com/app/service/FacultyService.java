package com.app.service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.DepartmentRepository;
import com.app.dao.FacultyRepository;
import com.app.dao.SubjectRepository;
import com.app.dto.FacultyDTO;
import com.app.entities.Department;
import com.app.entities.Faculty;
import com.app.entities.Subject;

@Service
public class FacultyService {

	@Autowired
    private FacultyRepository facultyRepository;
	@Autowired
    private DepartmentRepository departmentRepository;
	@Autowired
    private SubjectRepository subjectRepository;

	@Autowired
	private ModelMapper modelMapper;
	
 public void saveFaculty(String fname, String lname, String email, String password, Long departmentId, Long subjectId) {
    Department department = departmentRepository.findById(departmentId)
            .orElseThrow(() -> new RuntimeException("Department not found"));
    Subject subject = subjectRepository.findById(subjectId)
            .orElseThrow(() -> new RuntimeException("Subject not found"));

    Faculty faculty = new Faculty();
    faculty.setFname(fname);
    faculty.setLname(lname);
    faculty.setEmail(email);
    faculty.setPassword(password);
    faculty.setDepartment(department);
    faculty.setSubject(subject);
     facultyRepository.save(faculty);

}
//	public Faculty saveFaculty(FacultyDTO facultyDTO) {
//        Faculty faculty = new Faculty();
//        faculty.setFname(facultyDTO.getFname());
//        faculty.setLname(facultyDTO.getLname());
//        faculty.setEmail(facultyDTO.getEmail());
//        faculty.setPassword(facultyDTO.getPassword());
//
//        Department department = departmentRepository.findById(facultyDTO.getDepartmentId())
//                .orElseThrow(() -> new RuntimeException("Department not found"));
//        faculty.setDepartment(department);
//
//        Subject subject = subjectRepository.findById(facultyDTO.getSubjectId())
//                .orElseThrow(() -> new RuntimeException("Subject not found"));
//        faculty.setSubject(subject);
//
//        return facultyRepository.save(faculty);
//    }
   
//    public List<Faculty> getAllFaculties() {
//        return facultyRepository.findAll();
//    }

 public List<FacultyDTO> getAllFaculties() {
     List<Faculty> faculties = facultyRepository.findAll();
     return faculties.stream()
                     .map(this::convertToDto)
                     .collect(Collectors.toList());
 }

 private FacultyDTO convertToDto(Faculty faculty) {
     FacultyDTO facultyDTO = modelMapper.map(faculty, FacultyDTO.class);

     // Manually map lazy-loaded fields if necessary
     if (faculty.getDepartment() != null) {
         facultyDTO.setDepartmentName(faculty.getDepartment().getName());
     }

     if (faculty.getSubject() != null) {
         facultyDTO.setSubjectName(faculty.getSubject().getName());
     }

     return facultyDTO;
 }
    public Faculty getFacultyByEmail(String email) {
        return facultyRepository.findByEmail(email);
    }

   
    public Faculty login(String email, String password) {
        Faculty faculty = facultyRepository.findByEmail(email);
        if (faculty != null && faculty.getPassword().equals(password)) {
            return faculty;
        }
        return null;
    }
    
    

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id).orElse(null);
    }
//    public Faculty updateFaculty(Long id, FacultyDTO facultyDTO) {
//        
//    	System.out.println(id);
//    	
//    	Optional<Faculty> facultyOpt = facultyRepository.findById(id);
//
//        if (facultyOpt.isPresent()) {
//            Faculty faculty = facultyOpt.get();
//            faculty.setFname(facultyDTO.getFname());
//            faculty.setLname(facultyDTO.getLname());
//            faculty.setEmail(facultyDTO.getEmail());
//            if (!facultyDTO.getPassword().isEmpty()) {
//                faculty.setPassword(facultyDTO.getPassword());
//            }
//
//            Optional<Subject> subject = subjectRepository.findById(facultyDTO.getSubjectId());
//            subject.ifPresent(faculty::setSubject);
//
//            Optional<Department> department = departmentRepository.findById(facultyDTO.getDepartmentId());
//            department.ifPresent(faculty::setDepartment);
//
//            return facultyRepository.save(faculty);
//        }
//        return null;
//    }
    public FacultyDTO updateFaculty(Long id, FacultyDTO facultyDTO) {
        // Check if the Faculty with the given id exists
        Optional<Faculty> facultyOpt = facultyRepository.findById(id);
        if (facultyOpt.isPresent()) {
            Faculty faculty = facultyOpt.get();

            // Update the fields with the values from the DTO
            faculty.setFname(facultyDTO.getFname());
            faculty.setLname(facultyDTO.getLname());
            faculty.setEmail(facultyDTO.getEmail());

            // Update password only if it's not empty
            if (facultyDTO.getPassword() != null && !facultyDTO.getPassword().isEmpty()) {
                faculty.setPassword(facultyDTO.getPassword());
            }

            // Update the department if the id is present
            if (facultyDTO.getDepartmentId() != null) {
                Optional<Department> departmentOpt = departmentRepository.findById(facultyDTO.getDepartmentId());
                departmentOpt.ifPresent(faculty::setDepartment);
            }

            // Update the subject if the id is present
            if (facultyDTO.getSubjectId() != null) {
                Optional<Subject> subjectOpt = subjectRepository.findById(facultyDTO.getSubjectId());
                subjectOpt.ifPresent(faculty::setSubject);
            }

            
            // Save and return the updated Faculty entity
            return modelMapper.map(facultyRepository.save(faculty),FacultyDTO.class);
        } else {
            // Handle the case when the Faculty with the given id does not exist
            throw new RuntimeException("Faculty not found with id: " + id);
        }
    }

    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }
}

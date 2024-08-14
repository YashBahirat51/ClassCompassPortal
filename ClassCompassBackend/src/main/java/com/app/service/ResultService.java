//package com.app.service;
//
//import java.io.IOException;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.app.dao.ResultRepository;
//import com.app.dao.SubjectRepository;
//import com.app.dto.ResultDTO;
//import com.app.entities.Result;
//import com.app.mapper.ResultMapper;
//
//@Service
//public class ResultService {
//
//    @Autowired
//    private ResultRepository resultRepository;
//
//    @Autowired
//    ResultMapper mapper;
//    
//    @Autowired
//    SubjectRepository subject;
//    public ResultDTO saveResult(String name, MultipartFile file, Long subjectId) throws IOException {
//        Result result = new Result();
//        result.setName(name);
//        result.setFileName(file.getOriginalFilename());
//        result.setFileType(file.getContentType());
//        result.setFileData(file.getBytes());
//        result.setUploadDate(LocalDate.now());
//      
//         result.setSubject(subject.findById(subjectId).orElseThrow());
//        Result savedresult=resultRepository.save(result);
//        return mapper.toDTO(savedresult);
//    }
//
//    public List<ResultDTO> getAllResults() {
//        return resultRepository.findAll().stream()
//        		.map(result->mapper.toDTO(result))
//        		.collect(Collectors.toList());
//    
//    }
//
//    public ResultDTO getResultById(Long id) {
//    	
//        return mapper.toDTO(resultRepository.findById(id).orElseThrow());
//    }
//
//    public void deleteResult(Long id) {
//        resultRepository.deleteById(id);
//    }
//}
package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.ResultRepository;
import com.app.dao.SubjectRepository;
import com.app.dto.ResultDTO;
import com.app.entities.Result;
import com.app.entities.Subject;
import com.app.mapper.ResultMapper;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ResultMapper mapper;

    
    
    // Save a new result
    public Result saveResult(String name, Long subjectId, MultipartFile resultFile) throws IOException {
        Optional<Subject> subjectOpt = subjectRepository.findById(subjectId);
        if (!subjectOpt.isPresent()) {
            throw new RuntimeException("Subject not found with ID: " + subjectId);
        }

        Subject subject = subjectOpt.get();

        Result result = new Result();
        result.setName(name);
        result.setFileName(resultFile.getOriginalFilename());
        result.setFileType(resultFile.getContentType());
        result.setFileData(resultFile.getBytes());
        result.setUploadDate(LocalDate.now());
        result.setSubject(subject);

        return resultRepository.save(result);
    }

    // Fetch a result by its ID
    public Result getResult(Long fileId) {
        Optional<Result> resultOpt = resultRepository.findById(fileId);
        return resultOpt.orElse(null);
    }

    // Fetch results by department ID
    public List<ResultDTO> getResultsByDepartment(Long departmentId) {
        
    	
    	List<Result> results = findBySubjectDepartmentId(departmentId);

        return results.stream()
                .map(result ->  mapper.toDTO(result))
                .collect(Collectors.toList());
    }
    
    public List<Result> findBySubjectDepartmentId(Long deptId)
    {
    	List<Result> res=resultRepository.findAll();
    	return res.stream().filter(
    			result->result.getSubject().getId()==deptId
    					)
//    			.map(res1->mapper.toDTO(res1))
    			.collect(Collectors.toList());
    

    	
    }

    // Fetch all results
    public List<ResultDTO> getAllResults() {
        List<Result> results = resultRepository.findAll();

        return results.stream()
                .map(result ->  mapper.toDTO(result))
                .collect(Collectors.toList());
    }

    // Delete a result by its ID
    public void deleteResult(Long resultId) {
        resultRepository.deleteById(resultId);
    }
}

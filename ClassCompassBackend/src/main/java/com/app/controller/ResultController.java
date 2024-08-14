//package com.app.controller;
//
//import java.io.IOException;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.app.dto.ResultDTO;
//import com.app.entities.Result;
//import com.app.service.ResultService;
//
//@RestController
//@RequestMapping("/api/results")
//public class ResultController {
//
//    @Autowired
//    private ResultService resultService;
//
//    @PostMapping
//    public ResponseEntity<?> uploadResult(
//            @RequestParam("name") String name,
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("subjectId") Long subjectId) {
//        try {
//            ResultDTO result = resultService.saveResult(name, file, subjectId);
//            return new ResponseEntity<>(result, HttpStatus.CREATED);
//        } catch (IOException e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<?>> getAllResults() {
//        List<ResultDTO> results = resultService.getAllResults();
//        return new ResponseEntity<>(results, HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ResultDTO> getResultById(@PathVariable Long id) {
//        ResultDTO result = resultService.getResultById(id);
//        if (result!=null)
//        return new ResponseEntity<>(result,HttpStatus.FOUND);
//        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
//        resultService.deleteResult(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//    
//}
package com.app.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.dto.ResultDTO;
import com.app.entities.Result;
import com.app.service.ResultService;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping
    public ResponseEntity<String> uploadResult(
        @RequestParam Long subjectId,
        @RequestParam String name,
        @RequestParam("resultFile") MultipartFile resultFile) throws Exception {
        
        Result result = resultService.saveResult(name, subjectId, resultFile);
        
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/results/download/")
            .path(result.getId().toString())
            .toUriString();
        
        return ResponseEntity.ok("Result uploaded successfully! Download URL: " + downloadURL);
    }
    
    @GetMapping("/download/{fileId}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable Long fileId) {
        Result result = resultService.getResult(fileId);

        if (result == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        ByteArrayResource resource = new ByteArrayResource(result.getFileData());
        MediaType contentType = MediaType.parseMediaType(result.getFileType());
        
        return ResponseEntity.ok()
                .contentType(contentType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + result.getFileName() + "\"")
                .body(resource);
    }

    @GetMapping("/byDepartment/{departmentId}")
    public ResponseEntity<List<ResultDTO>> getResultsByDepartment(@PathVariable Long departmentId) {
       System.out.println(departmentId);
    	List<ResultDTO> results = resultService.getResultsByDepartment(departmentId);
        if (results == null || results.isEmpty()) {
        	System.out.println("no result");
            return ResponseEntity.ok(new ArrayList<ResultDTO>());
        }
        results.forEach(r->System.out.println(r.getFileName()));
        return ResponseEntity.ok(results);
    }

    @GetMapping
    public ResponseEntity<List<ResultDTO>> getAllResults() {
        List<ResultDTO> results = resultService.getAllResults();
        if (results.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(results);
    }

    @DeleteMapping("/{resultId}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long resultId) {
        resultService.deleteResult(resultId);
        return ResponseEntity.noContent().build();
    }
}

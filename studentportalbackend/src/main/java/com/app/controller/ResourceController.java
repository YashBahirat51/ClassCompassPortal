package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.dto.ResourceDTO;
import com.app.entities.Resource;
import com.app.service.ResourceService;
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping
    public ResponseEntity<String> uploadResource(
        @RequestParam Long subjectId,
        @RequestParam String name,
        @RequestParam("resourceFile") MultipartFile resourceFile) throws Exception {
        
        Resource attachment=resourceService.saveResource(name, subjectId, resourceFile);
        
        String downloadURL="";
        downloadURL=ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/")
        		.path(attachment.getId()).toUriString();
        
        System.out.println("DOWNLOAD URL"+downloadURL+
        		" file name :"+attachment.getFilename()+" "+ 
        		" content type "+resourceFile.getContentType());
        
         //return new ResourceDTO(attachment.getFilename(),downloadURL,resourceFile.getContentType(), resourceFile.getSize(),attachment.getSubject().toString());
        return ResponseEntity.ok("Resource uploaded successfully!");
        
    
    }
    
//    @GetMapping("/download/{fileid}")
//    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable Long fileid)
//    {
//    	Resource attachment=null;
//    	attachment=resourceService.getAttachment(fileid);
//    	return ResponseEntity.ok()
//    			.contentType(MediaType.parseMediaType(attachment.getFileType())).
//    			header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\""+attachment.getFilename()+"\"")
//    			.body(new ByteArrayResource(attachment.getData()));
//    }
//    @GetMapping("/download/{fileId}")
//    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String fileId) {
//        // Fetch the resource attachment by ID
//        Resource attachment = resourceService.getAttachment(fileId);
//        
//        // Check if the attachment was found
//        if (attachment == null) {
//            // Return a 404 Not Found status if the attachment does not exist
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//        
//        // Create a ByteArrayResource from the attachment data
//        ByteArrayResource resource = new ByteArrayResource(attachment.getData());
//        
//        // Set the content type based on the file type of the attachment
//        MediaType contentType = MediaType.parseMediaType(attachment.getFileType());
//        
//        // Build the response with the attachment content and appropriate headers
//        return ResponseEntity.ok()
//                .contentType(contentType)
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFilename() + "\"")
//                .body(resource);
//    }
    @GetMapping("/download/{fileId}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String fileId) {
        // Fetch the resource attachment by ID
        System.out.println("file id "+fileId);
    	
    	Resource attachment = resourceService.getAttachment(fileId);
        System.out.println("attachment found "+attachment.getFilename());
        // Check if the attachment was found
        if (attachment == null) {
            // Return a 404 Not Found status if the attachment does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        // Create a ByteArrayResource from the attachment data
        ByteArrayResource resource = new ByteArrayResource(attachment.getData());
        
        // Set the content type based on the file type of the attachment
        MediaType contentType = MediaType.parseMediaType(attachment.getFileType());
        
        // Build the response with the attachment content and appropriate headers
        return ResponseEntity.ok()
                .contentType(contentType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFilename() + "\"")
                .body(resource);
    }

    
    @GetMapping("/byDepartment/{departmentId}")
    public ResponseEntity<List<ResourceDTO>> getResourcesByDepartment(@PathVariable Long departmentId) {
        System.out.println("Fetching resources for department ID: " + departmentId);
        List<ResourceDTO> resources = resourceService.getResourcesByDepartment(departmentId);
        if (resources == null || resources.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if no resources found
        }
        return ResponseEntity.ok(resources);
    }
//    @GetMapping("/byDepartment/{departmentId}")
//    public ResponseEntity<List<ResourceDTO>> getResourcesByDepartment(@PathVariable Long departmentId) {
//        System.out.println("in resource ctlr");
//    	List<ResourceDTO> resources = resourceService.getResourcesByDepartment(departmentId);
//        return ResponseEntity.ok(resources);
//    }
//    @GetMapping("/download/{id}")
//    public ResponseEntity<byte[]> downloadResource(@PathVariable Long id) {
//        ResourceDTO resourceDTO = resourceService.getResourceById(id);
//        if (resourceDTO == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentDisposition(ContentDisposition.builder("attachment")
//                .filename(resourceDTO.getFileName())
//                .build());
//
//        return new ResponseEntity<>(resourceDTO.getData(), headers, HttpStatus.OK);
//    }
}

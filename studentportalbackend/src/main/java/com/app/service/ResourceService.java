package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.ResourceRepository;
import com.app.dto.ResourceDTO;
import com.app.entities.Resource;
import com.app.entities.Subject;

@Service
public class ResourceService {

	@Autowired
    private ResourceRepository resourceRepository;
	@Autowired
    private SubjectService subjectRepository;

//    public void saveResource(String name, Long subjectId, MultipartFile resourceFile) throws IOException {
//      
//    	Resource newResource=new Resource();
//    	newResource.setSubject(subjectRepository.getSubjectById(subjectId));
//    	newResource.setData(resourceFile.getBytes());
//    	newResource.setFilename(name);
//    	resourceRepository.save(newResource);
//    }
//    
    public Resource saveResource(String name, Long subjectId, MultipartFile resourceFile) throws Exception {
        String filename=StringUtils.cleanPath(resourceFile.getOriginalFilename());
    	try
    	{
    		if(filename.contains(".."))
    		{
    			throw new Exception("file name contains inva;id sequesnce");
    		}
    		Subject subject=subjectRepository.findById(subjectId).orElseThrow();
    		
    		Resource newResource=new Resource(filename,resourceFile.getContentType(),resourceFile.getBytes(),subject);
    		return resourceRepository.save(newResource);
    	}catch(Exception e)
    	{
    		e.printStackTrace();
    	throw new Exception("could not save file");	
    	}
        
        
//    	newResource.setSubject(subjectRepository.getSubjectById(subjectId));
//    	newResource.setData(resourceFile.getBytes());
//    	newResource.setFilename(name);
//    	resourceRepository.save(newResource);
    }
    
    
    public List<ResourceDTO> getResourcesByDepartment(Long departmentId) {
        List<Resource> resources = resourceRepository.findBySubjectDepartmentId(departmentId);
        return resources.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ResourceDTO convertToDTO(Resource resource) {
        ResourceDTO dto = new ResourceDTO();
        dto.setId(resource.getId());
        dto.setFileName(resource.getFilename());
        dto.setSubjectName(resource.getSubject().getName()); // Assuming you have a method to get the subject name
        return dto;
    }
//    public void saveResource(Long departmentId, Long subjectId, ResourceDTO resourceDTO) {
//        Resource resource = new Resource();
//        resource.setFilename(resourceDTO.getFileName());
//        resource.setData(resourceDTO.getData());
//
//        Optional<Subject> subjectOptional = subjectRepository.findById(subjectId);
//        if (subjectOptional.isPresent()) {
//            resource.setSubject(subjectOptional.get());
//            resourceRepository.save(resource);
//        } else {
//            throw new IllegalArgumentException("Subject with ID " + subjectId + " does not exist.");
//        }
//    }


//    public List<ResourceDTO> getResourcesByDepartment(Long departmentId) {
//        List<Resource> resources = resourceRepository.findBySubjectDepartmentId(departmentId);
//        return resources.stream()
//                .map(resource -> {
//                    ResourceDTO dto = new ResourceDTO();
//                    dto.setFileName((resource.getFilename()));
//                    dto.setData(resource.getData());
//                    // Assuming subject name is available in the DTO
//                    dto.setSubjectName(resource.getSubject() != null ? resource.getSubject().getName() : null);
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }


//    public ResourceDTO getResourceById(Long id) {
//        Optional<Resource> resourceOptional = resourceRepository.findById(id);
//        if (resourceOptional.isPresent()) {
//            Resource resource = resourceOptional.get();
//            ResourceDTO dto = new ResourceDTO();
////            dto.setId(resource.getId());
//            dto.setFileName(resource.getFilename());
//            dto.setData(resource.getData());
//            dto.setSubjectName(resource.getSubject() != null ? resource.getSubject().getName() : null);
//            return dto;
//        } else {
//            return null; // or throw an exception if preferred
//        }
//    }


	public Resource getAttachment(String fileid) {
		// TODO Auto-generated method stub
		
		return resourceRepository.findById(fileid).orElse(null);
	}
	public List<ResourceDTO> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(resource -> new ResourceDTO(
                        resource.getId(),
                        resource.getFilename(),
                        resource.getFileType(),
                        resource.getSubject().getName()))
                .collect(Collectors.toList());
    }

    public void deleteResource(String resourceId) {
        resourceRepository.deleteById(resourceId);
    }
}
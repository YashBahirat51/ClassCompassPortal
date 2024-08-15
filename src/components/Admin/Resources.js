import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ResourcesPage.css';

const BASE_URL = 'http://localhost:8080';

const Resource = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceName, setResourceName] = useState('');
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedDepartment) {
      fetchSubjects(selectedDepartment);
    }
    fetchAllResources();
  }, [selectedDepartment]);

  const fetchSubjects = async (departmentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/subjects/getSubjectsByDepartment?departmentId=${departmentId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]);
    }
  };

  const fetchAllResources = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedSubject('');
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleFileChange = (e) => {
    setResourceFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setResourceName(e.target.value);
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await axios.delete(`${BASE_URL}/api/resources/${resourceId}`);
      alert('Resource deleted successfully!');
      fetchAllResources(); // Refresh the resources list after deletion
    } catch (error) {
      console.error('Failed to delete resource:', error);
      alert('Failed to delete resource.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedSubject || !resourceFile || !resourceName) {
      alert('Please select a department, subject, resource file, and enter a resource name.');
      return;
    }

    const formData = new FormData();
    formData.append('departmentId', selectedDepartment);
    formData.append('subjectId', selectedSubject);
    formData.append('resourceFile', resourceFile);
    formData.append('name', resourceName);

    try {
      await axios.post(`${BASE_URL}/api/resources`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Resource uploaded successfully!');
      fetchAllResources(); // Refresh the resources list after upload
    } catch (error) {
      console.error('Failed to upload resource:', error);
      alert('Failed to upload resource.');
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="resource-page">
      <hr></hr>
      <div className="resource-form-container">
        <h3>Upload Resource</h3>
        
        <form className="resource-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department:</label>
            <select value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="">Select Department</option>
              <option value="1">PG-DAC</option>
              <option value="2">PG-DESD</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Subject:</label>
            <select value={selectedSubject} onChange={handleSubjectChange} disabled={!selectedDepartment}>
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Resource Name:</label>
            <input type="text" value={resourceName} onChange={handleNameChange} />
          </div>

          <div className="form-group">
            <label>Resource File:</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <button type="submit">Upload Resource</button>
        </form>
      </div>

      <div className="resource-table-container">
        <h3>Available Resources</h3>
        <div className="search-bar">
          <label>Search by File Name:</label>
          <input
            type="text"
            placeholder="Search resources"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.fileName}</td>
                <td>{resource.fileType}</td>
                <td>
                  <button onClick={() => handleDeleteResource(resource.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resource;

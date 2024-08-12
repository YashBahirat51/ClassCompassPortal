import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const Resource = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceName, setResourceName] = useState(''); // New state for resource name

  useEffect(() => {
    if (selectedDepartment) {
      // Fetch subjects based on the selected department
      fetchSubjects(selectedDepartment);
    }
  }, [selectedDepartment]);

  const fetchSubjects = async (departmentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/subjects/getSubjectsByDepartment?departmentId=${departmentId}`);
      console.log('Fetched subjects:', response.data); // Debugging line
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedSubject(''); // Reset subject when department changes
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleFileChange = (e) => {
    setResourceFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setResourceName(e.target.value); // Update resource name state
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
    formData.append('name', resourceName); // Add resource name to form data

    try {
      await axios.post(`${BASE_URL}/api/resources`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Resource uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload resource:', error);
      alert('Failed to upload resource.');
    }
  };

  return (
    <div>
      <h3>Upload Resource</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            <option value="1">PG-DAC</option>
            <option value="2">PG-DESD</option>
            <option value="3">PG-DBDA</option>
            <option value="4">PG-DITISS</option>
            <option value="5">PG-DAI</option>
            <option value="6">PG-DVLSI</option>
            <option value="7">PG-DHPCSA</option>
            <option value="8">PG-HPCAP</option>
            <option value="9">PG-DIOT</option>
            <option value="10">PG-DUASP</option>
          </select>
        </div>
        
        <div>
          <label>Subject:</label>
          <select value={selectedSubject} onChange={handleSubjectChange} disabled={!selectedDepartment}>
            <option value="">Select Subject</option>
            {subjects.length > 0 ? (
              subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>

        <div>
          <label>Resource Name:</label>
          <input type="text" value={resourceName} onChange={handleNameChange} />
        </div>

        <div>
          <label>Resource File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit">Upload Resource</button>
      </form>
    </div>
  );
};

export default Resource;

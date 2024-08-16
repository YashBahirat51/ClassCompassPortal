import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const Result = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [resultFile, setResultFile] = useState(null);
  const [resultName, setResultName] = useState('');
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDepartment) {
      fetchSubjects(selectedDepartment);
    }
    fetchAllResults();
  }, [selectedDepartment]);

  const fetchSubjects = async (departmentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/subjects/getSubjectsByDepartment?departmentId=${departmentId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]);
      setError('Failed to fetch subjects.');
    }
  };

  const fetchAllResults = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/results`);
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        console.warn('Unexpected response format for results:', response.data);
        setResults([]);
      }
    } catch (error) {
      console.error('Failed to fetch results:', error);
      setResults([]);
      setError('Failed to fetch results.');
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
    setResultFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setResultName(e.target.value);
  };

  const handleDeleteResult = async (resultId) => {
    try {
      await axios.delete(`${BASE_URL}/api/results/${resultId}`);
      alert('Result deleted successfully!');
      fetchAllResults(); // Refresh the results list after deletion
    } catch (error) {
      console.error('Failed to delete result:', error);
      alert('Failed to delete result.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedSubject || !resultFile || !resultName) {
      alert('Please select a department, subject, result file, and enter a result name.');
      return;
    }

    const formData = new FormData();
    formData.append('departmentId', selectedDepartment);
    formData.append('subjectId', selectedSubject);
    formData.append('file', resultFile);
    formData.append('name', resultName);

    try {
      await axios.post(`${BASE_URL}/api/results`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Result uploaded successfully!');
      fetchAllResults(); // Refresh the results list after upload
    } catch (error) {
      console.error('Failed to upload result:', error);
      alert('Failed to upload result.');
    }
  };

  // Ensure results is always an array before filtering
  const filteredResults = Array.isArray(results) ? results.filter(result =>
    result.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="result-container">
      <hr />
      <h3>Upload Result</h3>
      <form onSubmit={handleSubmit}>
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
            {subjects.length > 0 ? (
              subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Result Name:</label>
          <input type="text" value={resultName} onChange={handleNameChange} />
        </div>

        <div className="form-group">
          <label>Result File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <button type="submit">Upload Result</button>
        </div>
      </form>

      <h3>Available Results</h3>
      
      <div className="search-container">
        <label>Search by File Name:</label>
        <input
          type="text"
          placeholder="Search results"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {Array.isArray(results) && results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map(result => (
              <tr key={result.id}>
                <td>{result.fileName}</td>
                <td>{result.fileType}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteResult(result.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results available.</p>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Result;
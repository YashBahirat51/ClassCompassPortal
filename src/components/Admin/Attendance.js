import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const Attendance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [attendanceName, setAttendanceName] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedDepartment) {
      fetchSubjects(selectedDepartment);
    }
    fetchAllAttendances();
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

  const fetchAllAttendances = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/attendance`);
      if (Array.isArray(response.data)) {
        setAttendances(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setAttendances([]);
      }
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
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
    setAttendanceFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setAttendanceName(e.target.value);
  };

  const handleDeleteAttendance = async (attendanceId) => {
    try {
      await axios.delete(`${BASE_URL}/api/attendance/${attendanceId}`);
      alert('Attendance deleted successfully!');
      fetchAllAttendances(); // Refresh the attendance list after deletion
    } catch (error) {
      console.error('Failed to delete attendance:', error);
      alert('Failed to delete attendance.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedSubject || !attendanceFile || !attendanceName) {
      alert('Please select a department, subject, attendance file, and enter an attendance name.');
      return;
    }

    const formData = new FormData();
    formData.append('departmentId', selectedDepartment);
    formData.append('subjectId', selectedSubject);
    formData.append('file', attendanceFile);
    formData.append('name', attendanceName);

    try {
      await axios.post(`${BASE_URL}/api/attendance`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Attendance uploaded successfully!');
      fetchAllAttendances(); // Refresh the attendance list after upload
    } catch (error) {
      console.error('Failed to upload attendance:', error);
      alert('Failed to upload attendance.');
    }
  };

  const filteredAttendances = (Array.isArray(attendances) ? attendances : []).filter(attendance =>
    attendance.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="attendance-container">
      <h3>Upload Monthly Attendance</h3>
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
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Attendance Name:</label>
          <input type="text" value={attendanceName} onChange={handleNameChange} />
        </div>

        <div className="form-group">
          <label>Attendance File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <button type="submit">Upload Attendance</button>
        </div>
      </form>

      <h3>Available Attendance Files</h3>
      
      <div className="search-container">
        <label>Search by File Name:</label>
        <input
          type="text"
          placeholder="Search attendance"
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
          {filteredAttendances.map(attendance => (
            <tr key={attendance.id}>
              <td>{attendance.fileName}</td>
              <td>{attendance.fileType}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteAttendance(attendance.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;

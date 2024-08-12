// src/pages/StudentPage.js
import React, { useState } from 'react';
import '../styles/StudentPage.css';

const StudentPage = () => {
  const [departments, setDepartments] = useState([
    { name: 'DAC', students: [] },
    { name: 'DBDA', students: [] },
    { name: 'Embedded', students: [] }
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', department: 'DAC' });
  const [totalStudents, setTotalStudents] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const addStudent = () => {
    setDepartments((prev) => {
      const updatedDepartments = prev.map((dept) => {
        if (dept.name === newStudent.department) {
          const prn = dept.students.length + 1;
          return {
            ...dept,
            students: [...dept.students, { prn, name: newStudent.name }]
          };
        }
        return dept;
      });
      return updatedDepartments;
    });
    setNewStudent({ name: '', department: 'DAC' });
    setTotalStudents(totalStudents + 1);
  };

  return (
    <div className="student-page">
      <div className="student-form-container">
        <h1>Student Registration</h1>
        <form className="student-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Total Number of Students: {totalStudents}</label>
          </div>
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={newStudent.department}
              onChange={handleChange}
              required
            >
              {departments.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={addStudent}>
            Add Student
          </button>
        </form>
      </div>

      {departments.map((dept) => (
        <div key={dept.name} className="department-table-container">
          <h2>{dept.name} Students</h2>
          <table>
            <thead>
              <tr>
                <th>PRN</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {dept.students.map((student) => (
                <tr key={student.prn}>
                  <td>{student.prn}</td>
                  <td>{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default StudentPage;

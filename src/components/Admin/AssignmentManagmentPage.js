import React, { useState, useEffect } from 'react';
import { createAssignment, getAllAssignments, getAllSubjects, deleteAssignment } from '../../services/assignmnetApi';
import '../styles/AssignmentsPage.css'

const AssignmentManagementPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [deadline, setDeadline] = useState(''); // Use yyyy-mm-dd format
  const [subjectId, setSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchAssignments();
    fetchSubjects();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await getAllAssignments();
      setAssignments(response.data || []);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      setAssignments([]);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getAllSubjects();
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects([]);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting assignment:', { name, question, deadline, subjectId });

    try {
      const assignment = {
        name,
        question,
        deadline,
        subjectId
      };

      await createAssignment(assignment);

      // Reset the form fields after submission
      setName('');
      setQuestion('');
      setDeadline('');
      setSubjectId('');

      fetchAssignments(); // Refresh the assignment list
    } catch (error) {
      console.error('Failed to add assignment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      fetchAssignments(); // Refresh the list after deleting
    } catch (error) {
      console.error('Failed to delete assignment:', error);
    }
  };

  return (
    <div className="assignment-page">
      <hr></hr>
      <div className="assignment-form-container">
        <h3>Assignment Management</h3>
        <form className="assignment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Assignment Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Assignment Question"
              value={question}
              onChange={handleQuestionChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required>
              <option value="" disabled>Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Assignment</button>
        </form>
      </div>

      <div className="assignment-table-container">
        <h3>Existing Assignments</h3>
        <table>
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map(assignment => (
                <tr key={assignment.id}>
                  <td>{assignment.name}</td>
                  <td>{assignment.subjectName ? assignment.subjectName : 'No Subject'}</td>
                  <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(assignment.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No assignments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentManagementPage;

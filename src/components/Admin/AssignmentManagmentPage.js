import React, { useState, useEffect } from 'react';
import { createAssignment, getAllAssignments, getAllSubjects, deleteAssignment } from '../../services/assignmnetApi';

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
    <div>
      <h3>Assignment Management</h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Assignment Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Assignment Question"
            value={question}
            onChange={handleQuestionChange}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required>
            <option value="" disabled>Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Assignment</button>
      </form>

      <div>
        <h3>Existing Assignments</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Assignment Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Subject</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Deadline</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map(assignment => (
                <tr key={assignment.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{assignment.subject ? assignment.subject.name : 'No Subject'}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <button onClick={() => handleDelete(assignment.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '8px' }}>No assignments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentManagementPage;

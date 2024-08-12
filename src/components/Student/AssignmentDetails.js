// src/components/AssignmentDetails.js
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const AssignmentDetails = () => {
  const location = useLocation();
  const history = useHistory();
  const { assignment } = location.state || {};

  if (!assignment) {
    return <p>No assignment details available.</p>;
  }

  return (
    <div>
      <h3>Assignment Details</h3>
      <p><strong>Name:</strong> {assignment.name}</p>
      <p><strong>Subject:</strong> {assignment.subjectId}</p>
      <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleDateString()}</p>
      <p><strong>Question:</strong> {assignment.question}</p>

      {/* Back button to navigate to the previous page */}
      <button onClick={() => history.goBack()} style={{ marginTop: '20px' }}>
        Back
      </button>
    </div>
  );
};

export default AssignmentDetails;

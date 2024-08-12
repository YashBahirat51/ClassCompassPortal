import React, { useState } from 'react';
import { addAssignment } from '../../api/assignmnetApi';

const AddAssignment = () => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('deadline', deadline);
    formData.append('questionImage', questionImage);

    try {
      const result = await addAssignment(formData);
      setMessage('Assignment added successfully!');
    } catch (error) {
      setMessage('Failed to add assignment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assignment Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Question Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setQuestionImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Assignment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAssignment;

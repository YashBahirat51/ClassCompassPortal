import React, { useState } from 'react';
import { uploadAssignment } from '../../services/studentApi';

const UploadAssignment = () => {
    const [assignment, setAssignment] = useState({ title: '', file: null });

    const handleFileChange = (e) => {
        setAssignment({ ...assignment, file: e.target.files[0] });
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', assignment.title);
            formData.append('file', assignment.file);
            await uploadAssignment(formData);
            // Handle successful upload
        } catch (error) {
            console.error('Failed to upload assignment:', error);
        }
    };

    return (
        <div>
            <h1>Upload Assignment</h1>
            <input type="text" placeholder="Title" value={assignment.title} onChange={e => setAssignment({ ...assignment, title: e.target.value })} />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload Assignment</button>
        </div>
    );
};

export default UploadAssignment;

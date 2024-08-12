// src/components/Admin/AddSubject.js
import React, { useState } from 'react';
import { addSubject } from '../../api/adminApi';

const AddSubject = () => {
    const [subject, setSubject] = useState({ name: '', description: '', courseDuration: '' });

    const handleSubmit = async () => {
        try {
            await addSubject(subject);
            alert("Subject added successfully!");
            setSubject({ name: '', description: '', courseDuration: '' });
        } catch (error) {
            console.error('Failed to add subject:', error);
            alert("Failed to add subject. Please try again.");
        }
    };

    return (
        <div>
            <h1>Add Subject</h1>
            <input 
                type="text" 
                placeholder="Name" 
                value={subject.name} 
                onChange={e => setSubject({ ...subject, name: e.target.value })} 
            />
            <textarea 
                placeholder="Description" 
                value={subject.description} 
                onChange={e => setSubject({ ...subject, description: e.target.value })} 
            />
            <input 
                type="number" 
                placeholder="Course Duration" 
                value={subject.courseDuration} 
                onChange={e => setSubject({ ...subject, courseDuration: e.target.value })} 
            />
            <button onClick={handleSubmit}>Add Subject</button>
        </div>
    );
};

export default AddSubject;

import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../../services/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents()
            .then(response => {
                setStudents(response);
            })
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map(student => (
                    <li key={student.prnno}>{student.fname} {student.lname}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;

import React, { useState, useEffect } from 'react';
import { markAttendance, fetchStudents } from '../../services/adminApi';

const MarkAttendance = () => {
    const [date, setDate] = useState('');
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const students = await fetchStudents();
                const attendanceList = students.map(student => ({
                    studentId: student.id,
                    prnno: student.prnno,
                    fname: student.fname,
                    lname: student.lname,
                    status: true // true means present by default
                }));
                setAttendances(attendanceList);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };

        getStudents();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await markAttendance(date, attendances);
            alert('Attendance marked successfully!');
        } catch (error) {
            console.error('Failed to mark attendance:', error);
        }
    };

    const handleAttendanceChange = (index, status) => {
        const updatedAttendances = [...attendances];
        updatedAttendances[index].status = status;
        setAttendances(updatedAttendances);
    };

    return (
        <div>
            <h1>Mark Attendance</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                {attendances.map((attendance, index) => (
                    <div key={attendance.studentId}>
                        <span>{attendance.prnno} - {attendance.fname} {attendance.lname}</span>
                        <input
                            type="checkbox"
                            checked={!attendance.status}
                            onChange={e => handleAttendanceChange(index, !e.target.checked)}
                        />
                        Absent
                    </div>
                ))}
                <button type="submit">Mark Attendance</button>
            </form>
        </div>
    );
};

export default MarkAttendance;

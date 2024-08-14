// src/components/StudentSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StudentSidebar.css'; // Import CSS for styling

const StudentSidebar = ({ url, handleLogout }) => {
  return (
    <aside className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li><Link to={`${url}/profile`}>Profile</Link></li>
        <li><Link to={`${url}/timetable`}>View Timetable</Link></li>
        <li><Link to={`${url}/notice`}>View Notice</Link></li>
        
        <li><Link to={`${url}/viewresult`}>View Result</Link></li>
        <li><Link to={`${url}/resources`}>View Resources</Link></li>
        <li><Link to={`${url}/assignments`}>Assignments</Link></li>
        <li><Link to={`${url}/attendance`}>Attendance</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
          
      </ul>
    </aside>
  );
};

export default StudentSidebar;

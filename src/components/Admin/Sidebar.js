// src/components/Admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ url, handleLogout }) => {
    return (
        <aside className="sidebar">
            <h2>Admin Menu</h2>
            <ul>
                <li><Link to={`${url}/faculty`}>Faculty</Link></li>
                <li><Link to={`${url}/notice`}>Notice</Link></li>
                <li><Link to={`${url}/time-table`}>Time Table</Link></li>
                <li><Link to={`${url}/assignments`}>Assignments</Link></li>
                <li><Link to={`${url}/students`}>Students</Link></li>
                <li><Link to={`${url}/resources`}>Resources</Link></li>
                <li><Link to={`${url}/result`}>Result</Link></li>
                <li><Link to={`${url}/attendance`}>Monthly Attendance</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </aside>
    );
};

export default Sidebar;

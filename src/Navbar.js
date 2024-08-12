import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <ul>
            <li><Link to="/admin/login">Admin Login</Link></li>
            <li><Link to="/faculty/add-assignment">Add Assignment</Link></li>
            <li><Link to="/student/upload-assignment">Upload Assignment</Link></li>
        </ul>
    </nav>
);

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/admin/login">Admin Login</Link>
        <Link to="/faculty/login">Faculty Login</Link>
        <Link to="/student/login">Student Login</Link>
    </nav>
);

export default Navbar;

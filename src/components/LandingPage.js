// src/components/LandingPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory();

    const navigateToLogin = (role) => {
        if (role === 'admin') {
            history.push('/admin/login');
        } else if (role === 'faculty') {
            history.push('/faculty/login');
        } else if (role === 'student') {
            history.push('/student/login');
        }
    };

    return (
        <div>
            <h1>Welcome to the Student Portal</h1>
            <button onClick={() => navigateToLogin('admin')}>Admin Login</button>
            <button onClick={() => navigateToLogin('faculty')}>Faculty Login</button>
            <button onClick={() => navigateToLogin('student')}>Student Login</button>
        </div>
    );
};

export default LandingPage;

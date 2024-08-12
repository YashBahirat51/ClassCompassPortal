// src/components/Faculty/FacultyLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginFaculty } from '../../services/facultyApi';

const FacultyLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Hook for redirection

    const handleLogin = async () => {
        try {
            const user = await loginFaculty({ email, password });
            localStorage.setItem('user', JSON.stringify({ ...user, role: 'faculty' }));
            history.push('/faculty/dashboard'); // Redirect to Faculty Dashboard
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h1>Faculty Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default FacultyLogin;

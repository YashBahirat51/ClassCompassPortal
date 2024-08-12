// src/components/Admin/AdminLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAdmin } from '../../services/adminApi';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const user = await loginAdmin({ email, password });
            localStorage.setItem('user', JSON.stringify({ ...user, role: 'admin' }));
            history.push('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;

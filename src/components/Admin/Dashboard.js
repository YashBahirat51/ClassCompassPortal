// src/components/Admin/Dashboard.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');
        history.push('/admin/login'); // Redirect to login page
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Add more admin functionalities here */}
        </div>
    );
};

export default Dashboard;

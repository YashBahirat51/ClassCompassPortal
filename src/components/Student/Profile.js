import React, { useEffect, useState } from 'react';
import '../styles/Profile.css'; // Import the CSS file for styling

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user data found in localStorage.");
        }
    }, []);

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h3>Profile Information</h3>
                {user.image && (
                    <img
                        src={`data:image/jpeg;base64,${user.image}`}
                        alt="Profile"
                        className="profile-image"
                    />
                )}
            </div>
            <div className="profile-details">
                <div className="profile-item">
                    <label>PRN Number:</label>
                    <p>{user.prnno || 'N/A'}</p>
                </div>
                <div className="profile-item">
                    <label>First Name:</label>
                    <p>{user.fname || 'N/A'}</p>
                </div>
                <div className="profile-item">
                    <label>Last Name:</label>
                    <p>{user.lname || 'N/A'}</p>
                </div>
                <div className="profile-item">
                    <label>Email:</label>
                    <p>{user.email || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;

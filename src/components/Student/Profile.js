import React, { useEffect, useState } from 'react';

// const Profile = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // Retrieve user data from localStorage
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         if (storedUser) {
//             setUser(storedUser);
//         } else {
//             console.log("No user data found in localStorage.");
//         }
//     }, []);

//     if (!user) return <div>Loading...</div>;

//     return (
//         <div>
//             <h1>Profile</h1>
//             <p><strong>PRN Number:</strong> {user.prnno}</p>
//             <p><strong>First Name:</strong> {user.fname}</p>
//             <p><strong>Last Name:</strong> {user.lname}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             {/* Display profile image if available */}
//             {user.image && <img src={`data:image/jpeg;base64,${user.image}`} alt="Profile" />}
//         </div>
//     );
// };


const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Stored User Data:", storedUser); // Debugging line
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user data found in localStorage.");
        }
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>PRN Number:</strong> {user.prnno}</p>
            <p><strong>First Name:</strong> {user.fname}</p>
            <p><strong>Last Name:</strong> {user.lname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Display profile image if available */}
            {user.image && <img src={`data:image/jpeg;base64,${user.image}`} alt="Profile" />}
        </div>
    );
};
export default Profile;
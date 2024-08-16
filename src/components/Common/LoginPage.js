import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Used for navigation after login
import '../styles/LoginPage.css'; // CSS styles for the login page
import { loginAdmin } from '../../services/adminApi'; // API call for admin login
import { loginStudent } from '../../services/studentApi'; // API call for student login

const LoginPage = () => {
    // State variables to store email, password, user role, loading status, and error messages
    const [email, setEmail] = useState(''); // Stores email input
    const [password, setPassword] = useState(''); // Stores password input
    const [role, setRole] = useState('student'); // Stores the role, default is 'student'
    const [loading, setLoading] = useState(false); // Tracks loading state for the login button
    const [error, setError] = useState(''); // Stores error messages for invalid login
    const history = useHistory(); // Used for navigating to different pages after successful login

    // Function to handle login when the form is submitted
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents default form submission
        setLoading(true); // Shows loading state
        setError(''); // Clears any previous error messages

        try {
            let user;
            // If the selected role is admin, attempt admin login
            if (role === 'admin') {
                user = await loginAdmin({ email, password });
                // Store the user data and role in localStorage
                localStorage.setItem('user', JSON.stringify({ ...user, role: 'admin' }));
                // Navigate to the admin dashboard upon successful login
                history.push('/admin/dashboard');
            } else if (role === 'student') { // If the selected role is student, attempt student login
                user = await loginStudent({ email, password });
                // Store the user data and role in localStorage
                localStorage.setItem('user', JSON.stringify({ ...user, role: 'student' }));
                // Navigate to the student dashboard upon successful login
                history.push('/student/dashboard');
            }
        } catch (error) {
            // Set an error message if the login fails
            setError('Invalid credentials. Please try again.');
        } finally {
            // Remove the loading state after login attempt is completed
            setLoading(false);
        }
    };

    return (
        <div className="login-page"> {/* Main container for the login page */}
            <div className="login-section"> {/* Section for the login form */}
                <form onSubmit={handleLogin}> {/* Form submission triggers handleLogin */}
                    <h1>Login</h1> {/* Heading for the login form */}
                    <div className="form-group"> {/* Container for the email input */}
                        <label htmlFor="email">Email</label> {/* Label for the email input */}
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Updates the email state
                            required
                        />
                    </div>
                    <div className="form-group"> {/* Container for the password input */}
                        <label htmlFor="password">Password</label> {/* Label for the password input */}
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Updates the password state
                            required
                        />
                    </div>
                    <fieldset> {/* Fieldset for selecting user role */}
                        <legend>Select User</legend> {/* Legend for the user role options */}
                        <div>
                        <label for="stu1">
                            <input
                                type="radio"
                                value="student"
                                id="stu1"
                                checked={role === 'student'} // Checks if the role is 'student'
                                onChange={() => setRole('student')} // Updates the role state to 'student'
                            />
                            Student
                        </label>
                        </div>

                        <div>
                        <label for="adm1">
                            <input
                                type="radio"
                                value="admin"
                                id="adm1"
                                checked={role === 'admin'} // Checks if the role is 'admin'
                                onChange={() => setRole('admin')} // Updates the role state to 'admin'
                            />
                            Admin
                        </label>
                    
                        </div>
                        
                    </fieldset>
                    
                    <button type="submit" disabled={loading}> {/* Submit button, disabled during loading */}
                        {loading ? 'Logging in...' : 'Login'} {/* Displays loading text if loading */}
                    </button>
                    {error && <p className="error-message">{error}</p>} {/* Displays error message if login fails */}
                </form>
                
            </div>
            <div className="info-section"> {/* Section for additional information */}
                <img src='/college-image.jpeg' alt="College" className="college-image" /> {/* College image */}
                <div className="college-info"> {/* Container for college information */}
                    <h1>CDAC ACTS PUNE</h1> {/* Heading for the college information */}
                    <div className="info-content">
                        <ul>
                            <li> While C-DAC was being setup for the indigenous design, development and delivery of the supercomputing technologies for the country, the mandate given was to not only develop the supercomputing technologies in the shortest possible time but also continue to develop in the shortest possible time the high quality human resource, which will continue to develop such advanced technologies.This is the genesis of C-DAC, ACTS.</li>
                            <li> C-DAC's Advanced Computing Training School (ACTS) is dedicated to creating high quality manpower for C-DAC in particular and the IT industry in general through the designing and delivering various courses. The courses are offered through a network of Authorized Training Centres (ATC's) as well as C-DAC's own centers. Around quarter million students passed out since inception in last decade and a half. They are today successful employees of many Multinational and Premier Indian IT companies, and many of them have become successful entrepreneurs. </li>
                            <li> Over the last fourteen years, the activities of ACTS have extended nationally and internationally. Government of India has entrusted the job of setting up of Centre of Excellences in ICT by at Accra,Ghana,Dushanbe in Tajikistan and Tashkent in Uzbekistan. Similar projects are being undertaken for Tanzania andSeychelles.    C-DAC has set up “C-DAC School of Advanced Computing (C-SAC) at University of Mauritius. </li>
                            <li> ACTS has been facilitating the provision of IT Training to a large number of students in a quality mode. As a testimony of this STQC has awarded an ISO 9001:2008 to ACTS Pune. Few of our Authorized Training Centres are ISO 9001:2008 certified. C-DAC, ACTS conducts IT Training Programmes for the organized sector including Indian Army, Indian Navy and Indian Air Force. C-DAC, ACTS and Indian Army joined hands for the conducting various IT training programmes for the personnel of Indian army through MoU since 1999.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; // Exports the LoginPage component for use in other parts of the application

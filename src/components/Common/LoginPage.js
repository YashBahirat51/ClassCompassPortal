import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/LoginPage.css';
import { loginAdmin } from '../../services/adminApi';
import { loginStudent } from '../../services/studentApi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let user;
            if (role === 'admin') {
                user = await loginAdmin({ email, password });
                localStorage.setItem('user', JSON.stringify({ ...user, role: 'admin' }));
                history.push('/admin/dashboard');
            } else if (role === 'student') {
                user = await loginStudent({ email, password });
                localStorage.setItem('user', JSON.stringify({ ...user, role: 'student' }));
                history.push('/student/dashboard');
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-section">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <fieldset>
                        <legend>Select User</legend>
                        <div>
                        <label for="stu1">
                            <input
                                type="radio"
                                value="student"
                                id="stu1"
                                checked={role === 'student'}
                                onChange={() => setRole('student')}
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
                                checked={role === 'admin'}
                                onChange={() => setRole('admin')}
                            />
                            Admin
                        </label>
                    
                        </div>
                        
                    </fieldset>
                    
                        
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                
            </div>
            <div className="info-section">
                <img src='/college-image.jpeg' alt="College" className="college-image" />
                <div className="college-info">
                    <h1>CDAC ACTS PUNE</h1>
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

export default LoginPage;

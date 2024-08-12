// // src/components/Common/LoginPage.js
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import '../styles/LoginPage.css';
// import { loginAdmin } from '../../services/adminApi';
// import { loginStudent } from '../../services/studentApi';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('student');
//     const history = useHistory();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             if (role === 'admin') {
//                 const user = await loginAdmin({ email, password });
//                 localStorage.setItem('user', JSON.stringify({ ...user, role: 'admin' }));
//                 history.push('/admin/dashboard');
//             } else if (role === 'student') {
//                 const user = await loginStudent({ email, password });
                
//                 localStorage.setItem('user', JSON.stringify({ ...user, role: 'student' }));
//                 history.push('/student/dashboard');
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="login-section">
//                 <form onSubmit={handleLogin}>
//                     <h1>Login</h1>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>
//                             <input
//                                 type="radio"
//                                 value="student"
//                                 checked={role === 'student'}
//                                 onChange={() => setRole('student')}
//                             />
//                             Student
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 value="admin"
//                                 checked={role === 'admin'}
//                                 onChange={() => setRole('admin')}
//                             />
//                             Admin
//                         </label>
//                     </div>
//                     <button type="submit">Login</button>
//                 </form>
//                 <p>
//                     Do not have an account? <a href="/signup">Sign Up</a>
//                 </p>
//             </div>
//             <div className="info-section">
//                 <img src='/college-image.jpeg' alt="College" className="college-image" />
//                 <div className="college-info">
//                     <h1>Welcome to XYZ College</h1>
//                     <div className="info-content">
//                         <p>XYZ College is committed to providing quality education and fostering an environment of learning and growth. We offer a variety of programs and extracurricular activities to support the holistic development of our students.</p>
//                         <p>Our campus is equipped with state-of-the-art facilities, including modern classrooms, laboratories, and libraries. We also provide ample opportunities for sports, cultural activities, and community service.</p>
//                         <p>Join us at XYZ College to embark on a journey of academic excellence and personal growth. Our dedicated faculty and staff are here to support you every step of the way.</p>
//                         <p>For more information, please visit our website or contact our admissions office. We look forward to welcoming you to our community.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
// src/components/Common/LoginPage.js
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
                    <div className="form-group">
                        <label>
                            <input
                                type="radio"
                                value="student"
                                checked={role === 'student'}
                                onChange={() => setRole('student')}
                            />
                            Student
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={() => setRole('admin')}
                            />
                            Admin
                        </label>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p>
                    Do not have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
            <div className="info-section">
                <img src='/college-image.jpeg' alt="College" className="college-image" />
                <div className="college-info">
                    <h1>Welcome to XYZ College</h1>
                    <div className="info-content">
                        <p>XYZ College is committed to providing quality education and fostering an environment of learning and growth. We offer a variety of programs and extracurricular activities to support the holistic development of our students.</p>
                        <p>Our campus is equipped with state-of-the-art facilities, including modern classrooms, laboratories, and libraries. We also provide ample opportunities for sports, cultural activities, and community service.</p>
                        <p>Join us at XYZ College to embark on a journey of academic excellence and personal growth. Our dedicated faculty and staff are here to support you every step of the way.</p>
                        <p>For more information, please visit our website or contact our admissions office. We look forward to welcoming you to our community.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

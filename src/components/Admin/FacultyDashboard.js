import React, { useState, useEffect } from 'react';
import { addFaculty, fetchFaculties, deleteFaculty, updateFaculty } from '../../services/facultyApi';
import { getAllSubjects } from '../../services/assignmnetApi';
import FacultyNavbar from '../Faculty/FacultyNavbar';
import "../styles/AddFaculty.css";

const AddFaculty = () => {
    const [faculty, setFaculty] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        password: '',
        subjectId: '',
        department: ''
    });
    const [subjects, setSubjects] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Fetch subjects on component mount
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjectsResponse = await getAllSubjects();
                setSubjects(subjectsResponse.data);
            } catch (error) {
                console.error('Failed to fetch subjects:', error);
            }
        };

        fetchSubjects();
        loadFaculties(); // Load faculties on page load
    }, []);

    // Load faculty list
    const loadFaculties = async () => {
        try {
            const response = await fetchFaculties();
            setFaculties(response.data);
        } catch (error) {
            console.error('Failed to fetch faculties:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateFaculty(faculty.id, faculty);
                alert('Faculty updated successfully!');
            } else {
                await addFaculty(faculty);
                alert('Faculty added successfully!');
            }
            setFaculty({
                id: '',
                fname: '',
                lname: '',
                email: '',
                password: '',
                subjectId: '',
                department: ''
            });
            setEditing(false);
            loadFaculties(); // Reload faculty list after submission
            setShowForm(false); // Hide form after submission
        } catch (error) {
            console.error('Failed to add/update faculty:', error);
            alert('Error adding/updating faculty. Please try again.');
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this faculty?')) {
            try {
                await deleteFaculty(id);
                alert('Faculty deleted successfully!');
                loadFaculties(); // Reload faculty list after deletion
            } catch (error) {
                console.error('Failed to delete faculty:', error);
                alert('Error deleting faculty. Please try again.');
            }
        }
    };

    // Handle edit action
    const handleEdit = (faculty) => {
        setFaculty({
            id: faculty.id || '',
            fname: faculty.fname,
            lname: faculty.lname,
            email: faculty.email,
            password: '', // Clear password for editing
            subjectId: faculty.subjectId || '',
            department: faculty.department || '',
        });
        setEditing(true);
        setShowForm(true);
    };

    return (
        <div className="faculty-page">
            <FacultyNavbar
                onAddFacultyClick={() => {
                    setShowForm(true);
                    setEditing(false); // Reset editing state
                }}
                onLoadFacultiesClick={() => {
                    setShowForm(false); // Hide form
                    loadFaculties(); // Load faculties
                }}
            />

            {showForm && (
                <div className="faculty-form">
                    <h1>{editing ? 'Edit Faculty' : 'Add Faculty'}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="fname"
                                class="addF"
                                value={faculty.fname}
                                onChange={e => setFaculty({ ...faculty, fname: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lname"
                                class="addF"
                                value={faculty.lname}
                                onChange={e => setFaculty({ ...faculty, lname: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                class="addF"
                                value={faculty.email}
                                onChange={e => setFaculty({ ...faculty, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                class="addF"
                                value={faculty.password}
                                onChange={e => setFaculty({ ...faculty, password: e.target.value })}
                                required={!editing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <select
                                name="subjectId"
                                class="addF"
                                value={faculty.subjectId}
                                onChange={e => setFaculty({ ...faculty, subjectId: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select Subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <select
                                name="department"
                                class="addF"
                                value={faculty.department}
                                onChange={e => setFaculty({ ...faculty, department: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select Department</option>
                                {/* Adjust department options as needed */}
                                <option value="1">PG-DAC</option>
                                <option value="2">PG-DESD</option>
                                <option value="3">PG-DBDA</option>
                                <option value="4">PG-DITISS</option>
                                <option value="5">PG-DAI</option>
                                <option value="6">PG-DVLSI</option>
                                <option value="7">PG-DHPCSA</option>
                                <option value="8">PG-HPCAP</option>
                                <option value="9">PG-DIOT</option>
                                <option value="10">PG-DUASP</option>
                            </select>
                        </div>
                        <button type="submit">{editing ? 'Update Faculty' : 'Add Faculty'}</button>
                    </form>
                </div>
            )}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by first name or last name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="faculty-list">
                <h2>Faculty List</h2>
                {faculties.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties
                                .filter(faculty =>
                                    faculty.fname.toLowerCase().includes(search.toLowerCase()) ||
                                    faculty.lname.toLowerCase().includes(search.toLowerCase())
                                )
                                .map(faculty => (
                                    <tr key={faculty.id}>
                                        <td>{faculty.id}</td>
                                        <td>{faculty.fname}</td>
                                        <td>{faculty.lname}</td>
                                        <td>{faculty.email}</td>
                                        <td>{faculty.subjectName || 'N/A'}</td>
                                        <td>{faculty.departmentName || 'N/A'}</td>
                                        <td>
                                            <button onClick={() => handleEdit(faculty)}>Edit</button>
                                            <button onClick={() => handleDelete(faculty.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AddFaculty;

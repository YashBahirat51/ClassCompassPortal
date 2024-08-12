
import React from 'react';
import "../styles/FacultyNavbar.css"; // Import your CSS file for the Navbar

const FacultyNavbar = ({ onAddFacultyClick, onLoadFacultiesClick }) => {
    return (
        <div className="navbar">
            <button onClick={onAddFacultyClick}>Add Faculty</button>
            <button onClick={onLoadFacultiesClick}>Load Faculties</button>
        </div>
    );
};

export default FacultyNavbar;

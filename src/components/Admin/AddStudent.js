import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addStudent } from '../../services/studentApi';
import '../styles/AddStudent.css'; // Import CSS for styling

const AddStudent = ({ onAdd }) => {
  const [form, setForm] = useState({
    prnno: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    image: null,
    department: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('prnno', form.prnno);
      formData.append('fname', form.fname);
      formData.append('lname', form.lname);
      formData.append('email', form.email);
      formData.append('password', form.password);
      if (form.image) formData.append('image', form.image);
      formData.append('department', form.department);

      await addStudent(formData);
      alert('Student added successfully!');
      if (onAdd) {
        onAdd(); 
      }
      history.push('/admin/dashboard/students');
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student.');
    }
  };

  return (
    <div className="add-student-container">
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label>PRN Number</label>
          <input
            type="text"
            name="prnno"
            value={form.prnno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            value={form.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            value={form.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Department</option>
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
        <button className="submit-button" type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;

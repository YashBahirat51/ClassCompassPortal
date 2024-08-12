import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NoticePage.css';
import { useHistory } from 'react-router-dom';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    date: '',
    notice: '',
    department: 'PGDAC',
  });
  const [search, setSearch] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const history = useHistory();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    axios.get('http://localhost:8080/api/notices/all')
      .then(response => setNotices(response.data))
      .catch(error => console.error('Error fetching notices:', error));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterChange = (e) => {
    setFilterDepartment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/notices/register', form)
      .then(response => {
        setNotices([...notices, response.data]);
        setForm({
          date: '',
          notice: '',
          department: 'PGDAC',
        });
        console.log('Notice registered successfully:', response.data);
      })
      .catch(error => {
        console.error('Error registering notice:', error);
        if (error.response) {
          // Server responded with a status other than 2xx
          alert('Error: ' + error.response.data.message || 'Unknown server error');
        } else if (error.request) {
          // Request was made but no response received
          alert('Network error. Please check your connection.');
        } else {
          // Something else caused the error
          alert('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="notice-page">
      <button className="back-button" onClick={() => history.push('/dashboard')}>
        Back to Dashboard
      </button>
      <div className="notice-form">
        <h1>Notice Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Notice</label>
            <textarea
              name="notice"
              value={form.notice}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="none">Select One</option>
              <option value="DAC">PG-DAC</option>
              <option value="DESD">PG-DESD</option>
              <option value="DBDA">PG-DBDA</option>
              <option value="DITISS">PG-DITISS</option>
              <option value="DAI">PG-DAI</option>
              <option value="DVLSI">PG-DVLSI</option>
              <option value="DHPCSA">PG-DHPCSA</option>
              <option value="HPCAP">PG-HPCAP</option>
              <option value="DIOT">PG-DIOT</option>
              <option value="DUASP">PG-DUASP</option>
            </select>
          </div>
          <button type="submit">Register Notice</button>
        </form>
      </div>

      <div className="notice-list">
        <h2>Registered Notices</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by notice or department"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-bar">
          <label>Filter by Department:</label>
          <select value={filterDepartment} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="DAC">PG-DAC</option>
            <option value="DESD">PG-DESD</option>
            <option value="DBDA">PG-DBDA</option>
            <option value="DITISS">PG-DITISS</option>
            <option value="DAI">PG-DAI</option>
            <option value="DVLSI">PG-DVLSI</option>
            <option value="DHPCSA">PG-DHPCSA</option>
            <option value="HPCAP">PG-HPCAP</option>
            <option value="DIOT">PG-DIOT</option>
            <option value="DUASP">PG-DUASP</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Notice</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {notices.filter(notice => 
              (filterDepartment === 'all' || notice.department === filterDepartment) &&
              (notice.notice.toLowerCase().includes(search.toLowerCase()) || 
               notice.department.toLowerCase().includes(search.toLowerCase()))
            ).map((notice) => (
              <tr key={notice.id}>
                <td>{new Date(notice.date).toLocaleDateString()}</td>
                <td>{notice.notice}</td>
                <td>{notice.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticePage;

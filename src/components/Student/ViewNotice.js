import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  // Replace this with actual user data
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userDepartment = loggedInUser?.departmentName || '';

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    axios.get(`http://localhost:8080/api/notices/byDepartment/${userDepartment}`)
      .then(response => setNotices(response.data))
      .catch(error => console.error('Error fetching notices:', error));
  };

  return (
    <div className="view-notice-page">
      
      <div className="notice-list">
        <h2>Notices for {userDepartment}</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by notice text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
              notice.notice.toLowerCase().includes(search.toLowerCase())
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

export default ViewNotice;

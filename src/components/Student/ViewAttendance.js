import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ViewAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendances = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const departmentId = user?.department; // Adjust if your department ID is nested differently

      if (!departmentId) {
        setError('Department ID is not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/attendance/byDepartment/${departmentId}`);

        if (response.status === 200) {
          setAttendances(response.data);
          setFilteredAttendances(response.data);
        }
      } catch (err) {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError('Attendance records not found.');
              break;
            case 500:
              setError('Server error. Please try again later.');
              break;
            default:
              setError(`Failed to fetch attendance records: ${err.response.status} ${err.response.statusText}`);
          }
        } else {
          setError('Failed to fetch attendance records: Network error.');
        }
        console.error('Error response:', err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = attendances.filter(attendance => attendance.fileName.toLowerCase().includes(query));
      setFilteredAttendances(filtered);
    } else {
      setFilteredAttendances(attendances);
    }
  };

  const handleDownload = (attendanceId) => {
    window.open(`${BASE_URL}/api/attendance/download/${attendanceId}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Attendance Records</h3>
      
      <label htmlFor="search">Search by Filename:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Enter filename to search"
      />

      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {filteredAttendances.length > 0 ? (
            filteredAttendances.map((attendance) => (
              <tr key={attendance.id}>
                <td>{attendance.fileName}</td>
                <td>
                  <button onClick={() => handleDownload(attendance.id)}>Download</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No attendance records available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;

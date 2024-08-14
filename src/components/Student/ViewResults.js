import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const departmentId = user?.department;

      if (!departmentId) {
        setError('Department ID is not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        console.log(departmentId);
        const response = await axios.get(`${BASE_URL}/api/results/byDepartment/${departmentId}`);

        if (response.status === 200) {
          setResults(response.data);
          setFilteredResults(response.data);
        }
      } catch (err) {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError('Results not found.');
              break;
            case 500:
              setError('Server error. Please try again later.');
              break;
            default:
              setError(`Failed to fetch results: ${err.response.status} ${err.response.statusText}`);
          }
        } else {
          setError('Failed to fetch results: Network error.');
        }
        console.error('Error response:', err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = results.filter(result => result.fileName.toLowerCase().includes(query));
      setFilteredResults(filtered);
    } else {
      setFilteredResults(results);
    }
  };

  const handleDownload = (resultId) => {
    window.open(`${BASE_URL}/api/results/download/${resultId}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Results</h3>
      
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
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <tr key={result.id}>
                <td>{result.fileName}</td>
                <td>
                  <button onClick={() => handleDownload(result.id)}>Download</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No results available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResults;

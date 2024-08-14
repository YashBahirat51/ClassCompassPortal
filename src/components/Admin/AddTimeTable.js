

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddTimeTable.css'; // Import custom CSS for styling

const AddTimetable = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dept, setDept] = useState('none');
  const [postingDate, setPostingDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timetables, setTimetables] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('none');

  useEffect(() => {
    // Fetch existing timetables when the component mounts
    axios.get('http://localhost:8080/api/admin/timetables')
      .then(response => {
        console.log('Fetched timetables:', response.data); // Log the fetched timetables
        setTimetables(response.data);
      })
      .catch(error => console.error('Error fetching timetables:', error));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDeptChange = (event) => {
    setDept(event.target.value);
  };

  const handleDateChange = (event) => {
    setPostingDate(event.target.value);
  };

  const handleDeptFilterChange = (event) => {
    setSelectedDeptFilter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (dept === 'none') {
      setErrorMessage('Please select a department.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('timetableImage', selectedFile);
    formData.append('dept', dept);
    formData.append('postingDate', postingDate);

    try {
      const response = await axios.post('http://localhost:8080/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Timetable uploaded successfully.');
      setErrorMessage('');
      setShowForm(false);
      // Fetch the updated list of timetables
      axios.get('http://localhost:8080/api/admin/timetables')
        .then(response => {
          console.log('Updated timetables:', response.data); // Log the updated timetables
          setTimetables(response.data);
        })
        .catch(error => console.error('Error fetching timetables:', error));
    } catch (error) {
      setErrorMessage('Failed to upload timetable. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting timetable with ID:', id); // Log the ID to confirm it's correct

    if (!id || isNaN(id)) {
      console.error('Invalid ID for deletion');
      return;
    }

    if (window.confirm('Are you sure you want to delete this timetable?')) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/timetables/${id}`);
        setTimetables(timetables.filter(timetable => timetable.id !== id));
        setSuccessMessage('Timetable deleted successfully.');
      } catch (error) {
        console.error('Error deleting timetable:', error);
        setErrorMessage('Failed to delete timetable. Please try again.');
      }
    }
  };

  const filteredTimetables = timetables.filter(timetable => 
    selectedDeptFilter === 'none' || timetable.dept === selectedDeptFilter
  );

  return (
    <div className="container">
      <h2>Timetables</h2>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Timetable'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="form-group">
            <label htmlFor="fileInput">Select Timetable Image:</label>
            <input
              type="file"
              id="fileInput"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deptSelect">Select Department:</label>
            <select id="deptSelect" className="form-control" value={dept} onChange={handleDeptChange}>
              <option value="none">Select one</option>
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
          <div className="form-group">
            <label htmlFor="postingDate">Posting Date:</label>
            <input
              type="date"
              id="postingDate"
              className="form-control"
              value={postingDate}
              onChange={handleDateChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </form>
      )}

      <div className="mt-5">
        <div className="form-group">
          <label htmlFor="filterDeptSelect">Filter by Department:</label>
          <select id="filterDeptSelect" className="form-control" value={selectedDeptFilter} onChange={handleDeptFilterChange}>
            <option value="none">Select All</option>
            <option value="PGDAC">PG-DAC</option>
            <option value="PGDESD">PG-DESD</option>
            <option value="PGDBDA">PG-DBDA</option>
            <option value="PGDITISS">PG-DITISS</option>
            <option value="PGDAI">PG-DAI</option>
            <option value="PGDVLSI">PG-DVLSI</option>
            <option value="PGDHPCSA">PG-DHPCSA</option>
            <option value="PGHPCAP">PG-HPCAP</option>
            <option value="PGDIOT">PG-DIOT</option>
            <option value="PGDUASP">PG-DUASP</option>
          </select>
        </div>

        {filteredTimetables.length > 0 ? (
          <div className="row">
            {filteredTimetables.map((timetable) => (
              <div className="col-md-4 mb-4" key={timetable.id}>
                <div className="card timetable-card">
                  <img
                    src={`data:image/jpeg;base64,${timetable.imageData}`}
                    className="card-img-top timetable-image"
                    alt={`${timetable.dept} Timetable`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{timetable.dept}</h5>
                    <p className="card-text">Posted on: {timetable.postingDate}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(timetable.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No timetables available for the selected department.</p>
        )}
      </div>
    </div>
  );
};

export default AddTimetable;

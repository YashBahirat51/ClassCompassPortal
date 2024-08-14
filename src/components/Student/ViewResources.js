// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';

// const ViewResources = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const departmentId = user?.department;
      
//       if (!departmentId) {
//         setError('Department ID is not found in local storage.');
//         setLoading(false);
//         return;
//       }

//   //     try {
//   //       const response = await axios.get(`${BASE_URL}/api/resources/byDepartment/${departmentId}`);
//   //       setResources(response.data);
//   //     } catch (err) {
//   //       setError('Failed to fetch resources.');
//   //       console.error(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   try {
//     const response = await axios.get(`${BASE_URL}/api/resources/byDepartment/${departmentId}`);
//     setResources(response.data);
// } catch (err) {
//     setError(`Failed to fetch resources: ${err.response?.status} ${err.response?.statusText}`);
//     console.error('Error response:', err.response);
// } finally {
//     setLoading(false);
// }
//     };
//     fetchResources();
//   }, []);

//   const handleDownload = (resourceId, resourceName, resourceType) => {
//     window.open(`${BASE_URL}/api/resources/download/${resourceId}`, '_blank');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>Resources</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Subject</th>
//             <th>File</th> {/* File column for download */}
//           </tr>
//         </thead>
//         <tbody>
//           {resources.length > 0 ? (
//             resources.map((resource) => (
//               <tr key={resource.id}>
//                 <td>{resource.fileName}</td>
//                 <td>{resource.subjectName || 'Unknown'}</td>
//                 <td>
//                   <button
//                     onClick={() => handleDownload(resource.id, resource.name, resource.type)}
//                   >
//                     Download
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No resources available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewResources;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const departmentId = user?.department;

      if (!departmentId) {
        setError('Department ID is not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/resources/byDepartment/${departmentId}`);
        if (response.status === 200) {
          setResources(response.data);
          setFilteredResources(response.data);

          // Extract unique subjects from resources
          const uniqueSubjects = Array.from(new Set(response.data.map(resource => resource.subjectName)));
          setSubjects(uniqueSubjects);
        }
      } catch (err) {
        if (err.response) {
          // Handle errors based on response status code
          switch (err.response.status) {
            case 404:
              setError('Resources not found.');
              break;
            case 500:
              setError('Server error. Please try again later.');
              break;
            default:
              setError(`Failed to fetch resources: ${err.response.status} ${err.response.statusText}`);
          }
        } else {
          setError('Failed to fetch resources: Network error.');
        }
        console.error('Error response:', err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);

    if (subject) {
      // Filter resources based on selected subject
      const filtered = resources.filter(resource => resource.subjectName === subject);
      setFilteredResources(filtered);
    } else {
      // Show all resources if no subject is selected
      setFilteredResources(resources);
    }
  };

  const handleDownload = (resourceId) => {
    window.open(`${BASE_URL}/api/resources/download/${resourceId}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Resources</h3>
      
      <label htmlFor="subjectFilter">Filter by Subject:</label>
      <select
        id="subjectFilter"
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">All</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>File</th> 
          </tr>
        </thead>
        <tbody>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.fileName}</td>
                <td>{resource.subjectName || 'Unknown'}</td>
                <td>
                  <button onClick={() => handleDownload(resource.id)}>Download</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No resources available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResources;

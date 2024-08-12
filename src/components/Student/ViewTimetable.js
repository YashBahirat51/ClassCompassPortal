// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const ViewTimetable = () => {
// //   const [timetables, setTimetables] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fetch existing timetables when the component mounts
// //     axios.get('http://localhost:8080/api/admin/timetables')
// //       .then(response => {
// //         console.log('Fetched timetables:', response.data); // Log the fetched timetables
// //         setTimetables(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching timetables:', error);
// //         setError('Failed to load timetables.');
// //         setLoading(false);
// //       })
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2>Timetables</h2>

// //       {loading && <p>Loading...</p>}
// //       {error && <p>{error}</p>}

// //       {timetables.length > 0 ? (
// //         <div className="row">
// //           {timetables.map((timetable) => (
// //             <div className="col-md-4 mb-4" key={timetable.id}>
// //               <div className="card timetable-card">
// //                 <img
// //                   src={`data:image/jpeg;base64,${timetable.imageData}`}
// //                   className="card-img-top timetable-image"
// //                   alt={`${timetable.dept} Timetable`}
// //                   style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsive images
// //                 />
// //                 <div className="card-body">
// //                   <h5 className="card-title">{timetable.dept}</h5>
// //                   <p className="card-text">Posted on: {new Date(timetable.postingDate).toLocaleDateString()}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p>No timetables available.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default ViewTimetable;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ViewTimetable = () => {
//   const [timetables, setTimetables] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Assuming the department is stored in localStorage
//   // const userDept = localStorage.getItem('user'); // Replace 'userDept' with the actual key
//   const storedUser = JSON.parse(localStorage.getItem('user'));
       
//   useEffect(() => {
//     // Fetch existing timetables when the component mounts
//     axios.get('http://localhost:8080/api/admin/timetables')
//       .then(response => {
//         console.log('Fetched timetables:', response.data); // Log the fetched timetables

//         // Filter timetables based on the logged-in user's department
//         const filteredTimetables = response.data.filter(timetable => timetable.dept === storedUser.department.name);

//         setTimetables(filteredTimetables);
//       })
//       .catch(error => {
//         console.error('Error fetching timetables:', error);
//         setError('Failed to load timetables.');
//         setLoading(false);
//       })
//       .finally(() => setLoading(false));
//   }, [storedUser]);

//   return (
//     <div className="container">
//       <h2>Timetables</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {timetables.length > 0 ? (
//         <div className="row">
//           {timetables.map((timetable) => (
//             <div className="col-md-4 mb-4" key={timetable.id}>
//               <div className="card timetable-card">
//                 <img
//                   src={`data:image/jpeg;base64,${timetable.imageData}`}
//                   className="card-img-top timetable-image"
//                   alt={`${timetable.dept} Timetable`}
//                   style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsive images
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{timetable.dept}</h5>
//                   <p className="card-text">Posted on: {new Date(timetable.postingDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No timetables available for your department.</p>
//       )}
//     </div>
//   );
// };

// export default ViewTimetable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // New state to track if data has been fetched

  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!dataFetched) { // Check if data has already been fetched
      // Fetch existing timetables when the component mounts
      axios.get('http://localhost:8080/api/admin/timetables')
        .then(response => {
          console.log('Fetched timetables:', response.data); // Log the fetched timetables

          // Filter timetables based on the logged-in user's department
          const filteredTimetables = response.data.filter(timetable => timetable.dept === storedUser.departmentName);

          setTimetables(filteredTimetables);
          setDataFetched(true); // Set flag to true to indicate that data has been fetched
        })
        .catch(error => {
          console.error('Error fetching timetables:', error);
          setError('Failed to load timetables.');
        })
        .finally(() => setLoading(false));
    }
  }, [dataFetched, storedUser]);

  return (
    <div className="container">
      <h2>Timetables</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {timetables.length > 0 ? (
        <div className="row">
          {timetables.map((timetable) => (
            <div className="col-md-4 mb-4" key={timetable.id}>
              <div className="card timetable-card">
                <img
                  src={`data:image/jpeg;base64,${timetable.imageData}`}
                  className="card-img-top timetable-image"
                  alt={`${timetable.dept} Timetable`}
                  style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsive images
                />
                <div className="card-body">
                  <h5 className="card-title">{timetable.dept}</h5>
                  <p className="card-text">Posted on: {new Date(timetable.postingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No timetables available for your department.</p>
      )}
    </div>
  );
};

export default ViewTimetable;

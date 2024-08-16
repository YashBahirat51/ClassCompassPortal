// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { addStudent } from '../../services/studentApi';
// import '../styles/AddStudent.css'; // Import CSS for styling

// const AddStudent = ({ onAdd }) => {
//   const [form, setForm] = useState({
//     prnno: '',
//     fname: '',
//     lname: '',
//     email: '',
//     password: '',
//     image: null,
//     department: ''
//   });
//   const history = useHistory();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value
//     });
//   };

//   const handleFileChange = (e) => {
//     setForm({
//       ...form,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('prnno', form.prnno);
//       formData.append('fname', form.fname);
//       formData.append('lname', form.lname);
//       formData.append('email', form.email);
//       formData.append('password', form.password);
//       if (form.image) formData.append('image', form.image);
//       formData.append('department', form.department);

//       await addStudent(formData);
//       alert('Student added successfully!');
//       if (onAdd) {
//         onAdd(); 
//       }
//       history.push('/admin/dashboard/students');
//     } catch (error) {
//       console.error('Failed to add student:', error);
//       alert('Failed to add student.');
//     }
//   };

//   return (
//     <div className="add-student-container">
//       <h3>Add Student</h3>
//       <form onSubmit={handleSubmit} className="add-student-form">
//         <div className="form-group">
//           <label>PRN Number</label>
//           <input
//             type="text"
//             name="prnno"
//             value={form.prnno}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>First Name</label>
//           <input
//             type="text"
//             name="fname"
//             value={form.fname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lname"
//             value={form.lname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleFileChange}
//           />
//         </div>
//         <div className="form-group">
//           <label>Department</label>
//           <select
//             name="department"
//             value={form.department}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select Department</option>
//             <option value="1">PG-DAC</option>
//             <option value="2">PG-DESD</option>
//             <option value="3">PG-DBDA</option>
//             <option value="4">PG-DITISS</option>
//             <option value="5">PG-DAI</option>
//             <option value="6">PG-DVLSI</option>
//             <option value="7">PG-DHPCSA</option>
//             <option value="8">PG-HPCAP</option>
//             <option value="9">PG-DIOT</option>
//             <option value="10">PG-DUASP</option>
//           </select>
//         </div>
//         <button className="submit-button" type="submit">Add Student</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addStudent } from '../../services/studentApi';
import '../styles/AddStudent.css'; // Import CSS for styling

const AddStudent = ({ onAdd }) => {
  // State to hold form data
  const [form, setForm] = useState({
    prnno: '',         // PRN Number
    fname: '',         // First Name
    lname: '',         // Last Name
    email: '',         // Email
    password: '',      // Password
    image: null,       // Profile Image
    department: ''     // Department
  });

  // Hook to programmatically navigate
  const history = useHistory();

  // Handle changes to text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value  // Update form state based on input name
    });
  };

  // Handle changes to file input
  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]  // Update form state with selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
      // Create a FormData object to handle file and form data
      const formData = new FormData();
      formData.append('prnno', form.prnno);
      formData.append('fname', form.fname);
      formData.append('lname', form.lname);
      formData.append('email', form.email);
      formData.append('password', form.password);
      if (form.image) formData.append('image', form.image); // Append image if provided
      formData.append('department', form.department);

      // Call API to add student
      await addStudent(formData);
      alert('Student added successfully!'); // Success message

      // Optional callback if provided
      if (onAdd) {
        onAdd(); 
      }

      // Navigate to the student list page
      history.push('/admin/dashboard/students');
    } catch (error) {
      console.error('Failed to add student:', error); // Log error to console
      alert('Failed to add student.'); // Error message
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

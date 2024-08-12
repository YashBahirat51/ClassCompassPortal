import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddStudent from './AddStudent';
import { deleteStudent, getAllStudents, updateStudent, } from '../../services/studentApi';

const Students = () => {
  let { path, url } = useRouteMatch();
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({
    prnno: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    image: null
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setForm({
      prnno: student.prnno || '',
      fname: student.fname,
      lname: student.lname,
      email: student.email,
      password: student.password,
      image: null
    });
  };

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

  // const handleUpdate = async () => {
  //   if (!form.prnno || !Number.isInteger(parseInt(form.prnno))) {
  //       console.error('Invalid PRN number:', form.prnno);
  //       alert('Invalid PRN number. Please check the student information.');
  //       return;
  //   }

  //   if (window.confirm('Are you sure you want to update this student?')) {
  //       try {
  //           const formData = new FormData();
  //           Object.keys(form).forEach(key => formData.append(key, form[key]));

  //           await updateStudent(form.prnno, formData);
  //           await fetchStudents(); // Refresh student list
  //           setEditStudent(null);
  //           setForm({
  //               prnno: '',
  //               fname: '',
  //               lname: '',
  //               email: '',
  //               password: '',
  //               image: null
  //           });
  //           alert('Student updated successfully!');
  //       } catch (error) {
  //           console.error('Failed to update student:', error);
  //           alert('Failed to update student.');
  //       }
  //   }
  // };
//   const handleUpdate = async () => {
//     if (!form.prnno || !Number.isInteger(parseInt(form.prnno))) {
//         console.error('Invalid PRN number:', form.prnno);
//         alert('Invalid PRN number. Please check the student information.');
//         return;
//     }

//     if (window.confirm('Are you sure you want to update this student?')) {
//         try {
//             const formData = new FormData();
//             formData.append('prnno', form.prnno);
//             formData.append('fname', form.fname);
//             formData.append('lname', form.lname);
//             formData.append('email', form.email);
//             formData.append('password', form.password);
//             if (form.image) formData.append('image', form.image);

//             await updateStudent(form.prnno, formData);
//             await fetchStudents(); // Refresh student list
//             setEditStudent(null);
//             setForm({
//                 prnno: '',
//                 fname: '',
//                 lname: '',
//                 email: '',
//                 password: '',
//                 image: null
//             });
//             alert('Student updated successfully!');
//         } catch (error) {
//             console.error('Failed to update student:', error);
//             alert('Failed to update student.');
//         }
//     }
// };

const handleUpdate = async () => {
  if (!form.prnno || !Number.isInteger(parseInt(form.prnno))) {
      console.error('Invalid PRN number:', form.prnno);
      alert('Invalid PRN number. Please check the student information.');
      return;
  }

  if (window.confirm('Are you sure you want to update this student?')) {
      try {
          const formData = new FormData();
          formData.append('fname', form.fname);
          formData.append('lname', form.lname);
          formData.append('email', form.email);
          formData.append('password', form.password);
          if (form.image) formData.append('image', form.image);

          await updateStudent(form.prnno, formData);
          await fetchStudents(); // Refresh student list
          setEditStudent(null);
          setForm({
              prnno: '',
              fname: '',
              lname: '',
              email: '',
              password: '',
              image: null
          });
          alert('Student updated successfully!');
      } catch (error) {
          console.error('Failed to update student:', error);
          alert('Failed to update student.');
      }
  }
};

  const handleDelete = async (prnno) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(prnno);
        await fetchStudents(); // Refresh student list
        alert('Student deleted successfully!');
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        <li><Link to={`${url}/add-student`}>Add Student</Link></li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>PRN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.prnno}>
              <td>{student.prnno}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.email}</td>
              <td>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.prnno)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editStudent && (
        <div className="edit-form">
          <h3>Edit Student</h3>
          <form>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={form.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={form.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <button type="button" onClick={handleUpdate}>Update Student</button>
            <button type="button" onClick={() => setEditStudent(null)}>Cancel</button>
          </form>
        </div>
      )}

      <Switch>
        <Route path={`${path}/add-student`} render={() => <AddStudent onAdd={fetchStudents} />} />
      </Switch>
    </div>
  );
};

export default Students;

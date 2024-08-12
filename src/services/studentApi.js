import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/students';

export const loginStudent = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
};

export const uploadAssignment = async (formData) => {
    const response = await axios.post(`${BASE_URL}/upload-assignment`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};
export const addStudent = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to add student:', error);
      throw error;
    }
  };

// Fetch all students

export const getAllStudents = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data; // Ensure this returns an array
};

// Other functions like addStudent, updateStudent, deleteStudent


// // Add a new student
// export const addStudent = (studentData) => {
//     const formData = new FormData();
//     formData.append('prnno', studentData.prnno);
//     formData.append('fname', studentData.fname);
//     formData.append('lname', studentData.lname);
//     formData.append('email', studentData.email);
//     formData.append('password', studentData.password);
//     formData.append('department', studentData.departmentId);
//     if (studentData.image) {
//         formData.append('image', studentData.image);
//     }

//     return axios.post(`${BASE_URL}/add`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// };

// Update an existing student
export const updateStudent = async (prnno, studentData) => {
    try {
        const response = await axios.put(
            `http://localhost:8080/api/students/update/${prnno}`, // Update with your correct endpoint
            studentData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update student:', error);
        throw error;
    }
};
// Delete a student by ID
export const deleteStudent = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

// // Student login
// export const loginStudent = (email, password) => {
//     return axios.post(`${BASE_URL}/login`, { email, password });
// };

// // Upload an assignment
// export const uploadAssignment = (assignmentData) => {
//     const formData = new FormData();
//     formData.append('name', assignmentData.name);
//     formData.append('deadline', assignmentData.deadline);
//     formData.append('questionImage', assignmentData.questionImage);

//     return axios.post(`${BASE_URL}/uploadAssignment`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// };
export const fetchTimetable = () => {
    return axios.get(`${BASE_URL}/timetables`);
};




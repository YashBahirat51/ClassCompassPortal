import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/student';

// Upload an assignment
export const uploadAssignment = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload-assignment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading assignment:', error);
        throw error;
    }
};

// Fetch students
export const fetchStudents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/students`);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};


export const loginStudent = async (credentials) => {
    const response = await axios.post('/api/student/login', credentials);
    return response.data;
};

export const getAllStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };
  export const deleteStudent = async (prnno) => {
    try {
      await axios.delete(`${API_BASE_URL}/${prnno}`);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };
  export const updateStudent = async (student) => {
    const formData = new FormData();
    formData.append('prnno', student.prnno);
    formData.append('fname', student.fname);
    formData.append('lname', student.lname);
    formData.append('email', student.email);
    formData.append('password', student.password);
    if (student.image) {
      formData.append('image', student.image);
    }
  
    const response = await axios.put(`${API_BASE_URL}/api/students/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    return response.data;
  };
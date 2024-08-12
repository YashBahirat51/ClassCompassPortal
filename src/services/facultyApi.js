import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/faculties';

export const loginFaculty = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
};

export const addAssignment = async (assignment) => {
    const response = await axios.post(`${BASE_URL}/assignments`, assignment);
    return response.data;
};

// Fetch all faculties
export const fetchFaculties = () => {
    return axios.get(`${BASE_URL}/all`);
};

// Add a new faculty
export const addFaculty = (facultyData) => {
    const formData = new FormData();
    formData.append('fname', facultyData.fname);
    formData.append('lname', facultyData.lname);
    formData.append('email', facultyData.email);
    formData.append('password', facultyData.password);
    formData.append('department', facultyData.department);
    formData.append('subjectId', facultyData.subjectId);

    console.log(formData.departmentId,formData.subjectId)
    return axios.post(`${BASE_URL}/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Update an existing faculty
export const updateFaculty = (id, facultyData) => {
    return axios.put(`${BASE_URL}/${id}`, facultyData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// Delete a faculty by ID
export const deleteFaculty = (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`);
};

// // Faculty login
// export const loginFaculty = (email, password) => {
//     return axios.post(`${BASE_URL}/login`, { email, password });
// };
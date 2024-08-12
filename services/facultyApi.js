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

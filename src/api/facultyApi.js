import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/faculty';

export const addAssignment = async (assignment) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-assignment`, assignment);
        return response.data;
    } catch (error) {
        console.error('Error adding assignment:', error);
        throw error;
    }
};

export const facultyLogin = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error during faculty login:', error);
        throw error;
    }
};

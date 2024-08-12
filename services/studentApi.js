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

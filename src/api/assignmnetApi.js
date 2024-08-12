import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/faculties';


export const uploadAssignment = async (assignment) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload-assignment`, assignment);
        return response.data;
    } catch (error) {
        console.error('Error uploading assignment:', error);
        throw error;
    }
};

export const addAssignment = async (assignment) => {
    try {
        const response = await axios.post(`${BASE_URL}/assignments`, assignment, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding assignment:', error);
        throw error;
    }
};
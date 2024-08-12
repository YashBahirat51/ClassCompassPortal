import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/assignments';


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

export const getAllAssignments = () => {
    return axios.get(`${BASE_URL}`);
};

// Fetch all subjects (assuming there's an endpoint for this in `SubjectController`)
export const getAllSubjects = () => {
    return axios.get('http://localhost:8080/api/subjects');
};

// Create a new assignment
export const createAssignment = (assignmentData) => {
    return axios.post(`${BASE_URL}`, assignmentData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// Delete an assignment by ID
export const deleteAssignment = (assignmentId) => {
    return axios.delete(`${BASE_URL}/${assignmentId}`);
};

export const getAssignmentsByDepartment = (departmentId) => {
    return axios.get(`${BASE_URL}/department/${departmentId}`);
};
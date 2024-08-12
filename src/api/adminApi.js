import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const addStudent = async (student) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-student`, student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
};



export const addTimetable = async (timetable) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-timetable`, timetable);
        return response.data;
    } catch (error) {
        console.error('Error adding timetable:', error);
        throw error;
    }
};

export const markAttendance = async (attendance) => {
    try {
        const response = await axios.post(`${BASE_URL}/mark-attendance`, attendance);
        return response.data;
    } catch (error) {
        console.error('Error marking attendance:', error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchSubjects = async () => {
    return axios.get('http://localhost:8080/api/subjects');
};


export const addSubject = async (subject) => {
    return axios.post('/api/subjects', subject);
};


export const loginAdmin = async (credentials) => {
    const response = await axios.post('/api/admin/login', credentials);
    return response.data;
};

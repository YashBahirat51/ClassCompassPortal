import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const loginAdmin = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
};

export const addStudent = async (student) => {
    const response = await axios.post(`${BASE_URL}/add-student`, student);
    return response.data;
};

export const addFaculty = async (faculty) => {
    const response = await axios.post(`${BASE_URL}/add-faculty`, faculty);
    return response.data;
};

export const postNotice = async (notice) => {
    const response = await axios.post(`${BASE_URL}/post-notice`, notice);
    return response.data;
};


export const markAttendance = async (date, attendances) => {
    const response = await axios.post(`${BASE_URL}/mark-attendance`, attendances, {
        params: { date }
    });
    return response.data;
};


export const addTimetable = async (timetable) => {
    const response = await axios.post(`${BASE_URL}/add-timetable`, timetable);
    return response.data;
};
export const getStudents = async () => {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
};
export const fetchStudents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/students`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
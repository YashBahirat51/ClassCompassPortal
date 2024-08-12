import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const markAttendance = async (attendance) => {
    try {
        const response = await axios.post(`${BASE_URL}/mark-attendance`, attendance);
        return response.data;
    } catch (error) {
        console.error('Error marking attendance:', error);
        throw error;
    }
};

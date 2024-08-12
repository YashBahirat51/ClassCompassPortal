import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/timetables';
export const fetchTimetablesByDept = async (dept) => {
    try {
        const response = await axios.get(`${BASE_URL}/dept/${dept}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch timetables:', error);
        throw error;
    }
};
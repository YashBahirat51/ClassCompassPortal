import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const addTimetable = async (timetable) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-timetable`, timetable);
        return response.data;
    } catch (error) {
        console.error('Error adding timetable:', error);
        throw error;
    }
};

import axios from 'axios';

// Base URL of your backend API
const BASE_URL = 'http://localhost:8080/api/admin';

// Function to post a notice
export const postNotice = async (notice) => {
    try {
        const response = await axios.post(`${BASE_URL}/post-notice`, notice);
        return response.data;
    } catch (error) {
        console.error('Error posting notice:', error);
        throw error;
    }
};

// Function to fetch all notices
export const fetchNotices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notices`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notices:', error);
        throw error;
    }
};

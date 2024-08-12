// src/services/api.js

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL of your Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if needed
api.interceptors.request.use(
  (config) => {
    // You can add custom headers or tokens here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example of API call to fetch students
export const fetchStudents = () => {
  return api.get('/students');
};

// Example of API call to add a student
export const addStudent = (student) => {
  return api.post('/students', student);
};

// Add other API functions similarly

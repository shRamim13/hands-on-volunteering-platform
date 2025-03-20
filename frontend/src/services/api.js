import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor for adding token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data.data ? { data: response.data.data } : response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API endpoints
const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.put('/auth/profile', data),
};

// Events API endpoints
const eventsAPI = {
    getAll: () => api.get('/events'),
    getById: (id) => api.get(`/events/${id}`),
    create: (eventData) => api.post('/events', eventData),
    join: (eventId) => api.post(`/events/${eventId}/join`),
    update: (eventId, eventData) => api.put(`/events/${eventId}`, eventData),
};

// Teams API endpoints
const teamsAPI = {
    getAllTeams: () => api.get('/teams'),
    getTeamById: (id) => api.get(`/teams/${id}`),
    createTeam: (teamData) => api.post('/teams', teamData),
    joinTeam: (teamId) => api.post(`/teams/${teamId}/join`),
    updateTeam: (teamId, teamData) => api.put(`/teams/${teamId}`, teamData),
};

// Help Requests API endpoints
const helpRequestsAPI = {
    getAll: () => api.get('/help-requests'),
    getById: (id) => api.get(`/help-requests/${id}`),
    create: (requestData) => api.post('/help-requests', requestData),
    volunteer: (requestId) => api.post(`/help-requests/${requestId}/volunteer`),
    update: (requestId, requestData) => api.put(`/help-requests/${requestId}`, requestData),
};

// Export all API modules
export {
    authAPI,
    eventsAPI,
    teamsAPI,
    helpRequestsAPI
};

export default api;
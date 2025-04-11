import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', {email, password});
    return response.data;
};

export const register = async (name: string, email: string, password: string, role: string) => {
    const response = await api.post('/register', {name, email, password, role});
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/logout');
    return response.data;
};

// Admin API calls
export const getTournaments = async () => {
    const response = await api.get('/admin/tournaments');
    return response.data;
};

export const createTournament = async (data: {name: string; startDate: string; endDate: string}) => {
    const response = await api.post('/admin/tournaments/', data);
    return response.data;
};

export const addTeam = async (tournamentID: string, data: { name: string; coach: string }) => {
    const response = await api.post(`/admin/tournaments/${tournamentID}/teams`, data);
    return response.data;
};

export const generateSchedule = async (tournamentID: string) => {
    const response = await api.post(`/admin/tournaments/${tournamentID}/generate-schedule`);
    return response.data;
};

export const approveSchedule = async (scheduleID: string) => {
    const response = await api.post(`/admin/schedules/${scheduleID}/approve`);
    return response.data;
};

export const addMatch = async (scheduleID: string, data: { team1ID: string; team2ID: string; matchDate: string }) => {
    const response = await api.post(`/admin/schedules/${scheduleID}/matches`, data);
    return response.data;
};

export const saveResult = async (matchID: string, data: { scoreTeam1: number; scoreTeam2: number }) => {
    const response = await api.post(`/admin/matches/${matchID}/result`, data);
    return response.data;
};

export const updateRanking = async (tournamentID: string) => {
    const response = await api.post(`/admin/tournaments/${tournamentID}/update-ranking`);
    return response.data;
};

// Coach API calls
export const getCoachSchedules = async (tournamentID: string) => {
    const response = await api.get(`/coach/tournaments/${tournamentID}/schedules`);
    return response.data;
};
  
  export const getCoachMatches = async (scheduleID: string) => {
    const response = await api.get(`/coach/schedules/${scheduleID}/matches`);
    return response.data;
};
  
  export const getCoachRankings = async (tournamentID: string) => {
    const response = await api.get(`/coach/tournaments/${tournamentID}/rankings`);
    return response.data;
};
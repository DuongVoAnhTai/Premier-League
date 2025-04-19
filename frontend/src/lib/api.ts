import { setToken } from '@/utils/localStorage';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ,
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

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await api.post("/login", credentials);
        const { token } = response.data; // Giả sử server trả về token trong response.data

        // Lưu token vào localStorage
        if (token) {
            setToken(token);
            document.cookie = `authToken=${token}; path=/; max-age=86400`;
        }

        return response.data; // Trả về dữ liệu từ server (có thể chứa thông tin user, token, v.v.)
    } catch (error: any) {
        // Xử lý lỗi từ API
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const register = async (data: { email: string; name: string; password: string; role: string }) => {
    try {
        const response = await api.post("/register", {
            username: data.email, // Map email to username as per AuthController.php
            displayName: data.name, // Map name to displayName
            password: data.password,
            roleID: data.role, // Assuming roleID is the role name (e.g., "USER")
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const logout = async () => {
    try {
        const response = await api.post("/logout");
        localStorage.removeItem("token"); // Xóa token sau khi logout
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};

export const getCurrentUser = async () => {
    const response = await api.get('/user/me');
    return response.data;
};

export const updateUserProfile = async (data: { name: string; password?: string }) => {
    const response = await api.put('/user/update-profile', data);
    return response.data;
};

export const getTournamentsNav = async () => {
    const res = await api.get('/dashboard/tournaments');
    return res.data;
  };

export const getUserCards = async () => {
    const response = await api.get('/dashboard/user-cards');
    return response.data;
};

export const getTeamDistribution = async () => {
    const response = await api.get('/dashboard/team-distribution');
    return response.data;
};

export const getPlayerAgeDistribution = async () => {
    const response = await api.get('/dashboard/player-age-distribution');
    return response.data;
};

// Admin tournament calls
export const getTournaments = async () => {
    const response = await api.get('/tournament/tournaments');
    return response.data;
};

export const createTournament = async (newTournament: any) => {
    const response = await api.post('/tournament/tournaments', newTournament);
    return response.data;
};

export const updateTournament = async (id: string, data: any) => {
    const response = await api.put(`/tournament/tournaments/${id}`, data);
    return response.data;
};

export const deleteTournament = async (id: string) => {
    const response = await api.delete(`/tournament/tournaments/${id}`);
    return response.data;
};

export const getTournamentCompletion = async (tournamentID: string) => {
    const response = await api.get(`/tournament/tournaments/${tournamentID}/completion`);
    return response.data;
};

// Admin Team Calls
export const getAllTeams = async () => {
    const response = await api.get('/team/teams');
    return response.data;
};

export const createTeam = async (teamData: any) => {
    const response = await api.post('/team/teams', teamData);
    return response.data;
};

export const updateTeam = async (id: string, teamData: any) => {
    const response = await api.put(`/team/teams/${id}`, teamData);
    return response.data;
};

export const deleteTeam = async (id: string) => {
    const response = await api.delete(`/team/teams/${id}`);
    return response.data;
};

// Player APIs
export const getTeams = async () => {
    const response = await api.get('/player/teams');
    return response.data;
};

export const getAllPlayers = async () => {
    const response = await api.get('/player/players');
    return response.data;
};

export const createPlayer = async (newPlayer: any) => {
    const response = await api.post('/player/players', newPlayer);
    return response.data;
};

export const updatePlayer = async (id: string, data: any) => {
    const response = await api.put(`/player/players/${id}`, data);
    return response.data;
};

export const deletePlayer = async (id: string) => {
    const response = await api.delete(`/player/players/${id}`);
    return response.data;
};

// Match APIs
export const getAllMatches = async () => {
    const response = await api.get('/match/matches');
    return response.data;
};

export const createMatch = async (newMatch: any) => {
    const response = await api.post('/match/matches', newMatch);
    return response.data;
};

export const updateMatch = async (id: string, data: any) => {
    const response = await api.put(`/match/matches/${id}`, data);
    return response.data;
};

export const deleteMatch = async (id: string) => {
    const response = await api.delete(`/match/matches/${id}`);
    return response.data;
};

// Goal APIs
export const getAllGoals = async () => {
    const response = await api.get('/goal/goals');
    return response.data;
};

export const createGoal = async (newGoal: any) => {
    const response = await api.post('/goal/goals', newGoal);
    return response.data;
};

export const updateGoal = async (id: string, data: any) => {
    const response = await api.put(`/goal/goals/${id}`, data);
    return response.data;
};

export const deleteGoal = async (id: string) => {
    const response = await api.delete(`/goal/goals/${id}`);
    return response.data;
};

// Standing APIs
export const getStandings = async () => {
    const response = await api.get('/standing/standings');
    return response.data;
};

export const createStanding = async (newStanding: any) => {
    const response = await api.post('/standing/standings', newStanding);
    return response.data;
};

export const updateStanding = async (id: string, data: any) => {
    const response = await api.put(`/standing/standings/${id}`, data);
    return response.data;
};

export const deleteStanding = async (id: string) => {
    const response = await api.delete(`/standing/standings/${id}`);
    return response.data;
};

// User APIs
export const getUsers = async () => {
    const response = await api.get('/user/users');
    return response.data;
};

export const createUser = async (newUser: any) => {
    const response = await api.post('/user/users', newUser);
    return response.data;
};

export const updateUser = async (id: number, data: any) => {
    const response = await api.put(`/user/users/${id}`, data);
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await api.delete(`/user/users/${id}`);
    return response.data;
};
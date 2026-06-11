import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchVideoInfo = async (url) => {
    const response = await api.post('/video/info', { url });
    return response.data;
};

export const getDownloadUrl = (url, formatId) => {
    return `${API_BASE_URL}/video/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(formatId)}`;
};

export default api;

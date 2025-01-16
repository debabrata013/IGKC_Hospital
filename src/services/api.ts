import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAppointments = () => api.get('/appointments');
export const fetchMedicalRecords = (page: number) => api.get(`/medical-records?page=${page}`);
export const fetchPrescriptions = () => api.get('/prescriptions');
export const fetchBills = () => api.get('/bills');
export const fetchMessages = (page: number) => api.get(`/messages?page=${page}`);

export const createAppointment = (appointmentData: any) => api.post('/appointments', appointmentData);
export const updateAppointment = (id: number, appointmentData: any) => api.put(`/appointments/${id}`, appointmentData);

export const requestPrescriptionRefill = (id: number) => api.post(`/prescriptions/${id}/refill`);

export const payBill = (id: number) => api.post(`/bills/${id}/pay`);

export const sendMessage = (messageData: any) => api.post('/messages', messageData);

export const updateUserSettings = (settingsData: any) => api.put('/user/settings', settingsData);

export default api;


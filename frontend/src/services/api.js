import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const travelApi = {
    // AI Chat
    chat: (messages) => api.post('/ai/chat', { messages }),

    // Travel Data
    searchTrips: (params) => api.get('/travel/trips', { params }),
    getTrip: (id) => api.get(`/travel/trips/${id}`),
    getBookings: (userId) => api.get('/travel/bookings', { params: { user_id: userId } }),
    createBooking: (data) => api.post('/travel/bookings', data),
    searchFlights: (params) => api.get('/travel/flights', { params }),
    searchHotels: (params) => api.get('/travel/hotels', { params }),

    // Payments
    processPayment: (paymentData) => api.post("/payments/process", paymentData),

    // Chatbase
    getChatbaseToken: (userId, email, name) => api.post("/chatbase/token", { user_id: userId, email, name }),

    // Driver
    getDriverTrips: (driverId) => api.get('/travel/trips', { params: { driver_id: driverId } }),
    updateTripStatus: (tripId, status) => api.patch(`/travel/trips/${tripId}/status`, { status }),
    getTripPassengers: (tripId) => api.get(`/travel/trips/${tripId}/passengers`),
};

export default api;

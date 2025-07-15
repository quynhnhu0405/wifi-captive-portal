const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

window.wifiService = {
  submitCustomerInfo: (data) => api.post("/users", data),
};
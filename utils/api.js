const API_URL = "http://45.251.115.161:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

window.wifiService = {
  submitCustomerInfo: (data) => api.post("/users", data),
};
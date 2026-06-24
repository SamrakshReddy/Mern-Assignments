import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// existing line
const BASE_URL = import.meta.env.VITE_API_URL || "";

export const useAuth = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
  loading: false,
  error: null,

  login: async (userCredObj) => {
    console.log("userCredObj is:", userCredObj);
    try {
      set({ loading: true, error: null });

      const res = await axios.post(
  `${BASE_URL}/common-api/login`,
  userCredObj
);

const user = res.data.payload;
const token = res.data.token; // 👈 IMPORTANT

localStorage.setItem("currentUser", JSON.stringify(user));
localStorage.setItem("token", token); // 👈 ADD THIS

      

      set({
        currentUser: user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Login failed",
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axios.get(
        `${BASE_URL}/common-api/logout`,   
    
      );

      localStorage.removeItem("currentUser");

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Logout failed",
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });

     const res = await axios.get(
  `${BASE_URL}/common-api/check-auth`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);
      const user = res.data.payload;

      localStorage.setItem("currentUser", JSON.stringify(user));

      set({
        currentUser: user,
        isAuthenticated: true,
        loading: false,
      });

    } catch (err) {
      console.log("CHECK AUTH ERROR:", err);

      const storedUser = JSON.parse(localStorage.getItem("currentUser"));

      if (storedUser) {
        set({
          currentUser: storedUser,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    }
  }
}));
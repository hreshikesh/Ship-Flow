import axios from "axios";

const chatbotApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor
chatbotApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
chatbotApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

// ✅ Chatbot Service
export const chatbotService = {
  /**
   * Send chat message to SHIPFLOW AI
   * @param {string} message         - User's question
   * @param {string} conversationId  - Persistent conversation ID for memory
   * @returns {Promise} ChatResponse with suggestions, sources, etc.
   */
  chat: async (message, conversationId = null) => {
    const response = await chatbotApi.post("/ai/chat", {
      message,
      conversationId,   // ✅ Backend needs this for memory
    });
    return response.data;
  },

  /**
   * Check AI service health
   * @returns {Promise} Health status
   */
  checkHealth: async () => {
    const response = await chatbotApi.get("/ai/health");
    return response.data;
  },

  /**
   * Clear conversation memory on backend (optional)
   * @param {string} conversationId
   */
  clearConversation: async (conversationId) => {
    if (!conversationId) return;
    try {
      await chatbotApi.delete(`/ai/conversation/${conversationId}`);
    } catch (err) {
      console.warn("Failed to clear conversation:", err);
    }
  },
};

export default chatbotApi;
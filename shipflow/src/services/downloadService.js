// services/downloadService.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://sandebtech.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/**
 * Submits user info before allowing a PDF download.
 */
export async function submitDownloadInfo(payload) {
  if (!payload?.name?.trim()) throw new Error("Name is required.");
  if (!payload?.email?.trim()) throw new Error("Email is required.");
  if (!payload?.documentTitle?.trim())
    throw new Error("Document title is required.");

  try {
    const response = await API.post("/download/save", {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || null,
      documentTitle: payload.documentTitle.trim(),
    });

    if (response.data === true || response.status === 200 || response.status === 201) {
      return true;
    }

    throw new Error("Server did not confirm the save operation.");
  } catch (error) {
    console.error("Download submission error:", error);
    throw error;
  }
}

// ✅ Default export for compatibility with default imports
export default {
  submitDownloadInfo,
};
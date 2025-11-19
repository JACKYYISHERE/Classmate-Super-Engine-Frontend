import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example usage:
// const res = await api.post("/api/analyze", { text: "your text here" });


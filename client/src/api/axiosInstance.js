import axios from "axios";

// 🔧 Istanza Axios base, senza getState o store
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: false, // se usi cookie, metti true
});

// ❌ Non aggiungere token automaticamente qui
// ✅ Passa l'Authorization manualmente nei thunk o in useApi/apiStandalone

export default axiosInstance;


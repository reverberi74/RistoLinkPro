import { createContext, useContext } from "react";
import axios from "axios";
import { config } from "../config";
import { useSelector } from "react-redux";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    const get = async (path) => {
        try {
            const response = await axios({
                url: `${config.API_BASE_URL}/api${path}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const post = async (path, payload) => {
        try {
            const response = await axios({
                url: `${config.API_BASE_URL}/api${path}`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                data: payload
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };
    
    const put = async (path, payload) => {
        try {
            const response = await axios({
                url: `${config.API_BASE_URL}/api${path}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                data: payload
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };
    
    const del = async (path) => {
        try {
            const response = await axios({
                url: `${config.API_BASE_URL}/api${path}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const login = async (payload) => {
        try {
            payload.role = payload.role || "user";
            
            const response = await axios({
                url: `${config.API_BASE_URL}/auth/login`,
                method: "POST",
                data: payload
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <ApiContext.Provider value={{ get, post, put, del, login }}>
            {children}
        </ApiContext.Provider>
    )
}

/**
 * @returns {{
 *  login: (payload: { email: string, password: string, role?: string }) => Promise<any>,
 *  get: (path: string) => Promise<any>,
 *  post: (path: string, payload: Record<any, string>) => Promise<any>,
 *  put: (path: string, payload: Record<any, string>) => Promise<any>,
 *  del: (path: string) => Promise<any>,
 * }}
 */
export const useApi = () => {
    return useContext(ApiContext);
}

export const api = {
    get: (path) => axios.get(`${config.API_BASE_URL}/api${path}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }),

    post: (path, payload) => axios.post(`${config.API_BASE_URL}/api${path}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }),

    put: (path, payload) => axios.put(`${config.API_BASE_URL}/api${path}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }),

    del: (path) => axios.delete(`${config.API_BASE_URL}/api${path}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }),
};
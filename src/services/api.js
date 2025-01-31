import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            // Store user data in localStorage or state management
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            // Transform the error into a user-friendly format
            if (error.response) {
                throw error.response.data;
            }
            throw { message: 'Network error occurred' };
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            throw { message: 'Network error occurred' };
        }
    }
};

const transService = {
    add: async(transaction, params) => {
        try {
            const response = await api.post('/api/transactions/add', transaction, {params: params});
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status". error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
            
        }
    },

    getAll: async(budget_id, params) => {
        try {
            const response = await api.get(`api/transactions/budget/${budget_id}`, {params : params});
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status", error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
            
        }
    },

    getTag: async(tag_id, params) => {
        try {
            const response = await api.get(`api/transactions/tag/${tag_id}`, {params : params})
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status". error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
            
        }
    },

    update: async(id, params) => {
        try{
            const response = await api.put(`api/transactions/update/${id}`, {params: params});
            return response.data;
        }catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status", error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
            
        }
    },

    delete: async(id, params) => {
        try{
            const response = await api.delete(`api/transactions/delete/${id}`, {params : params});
            return response.data;
        }catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status", error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
        }
    },

    search: async(query) => {

        try {
            const response = await api.get(`api/transactions/search?query=${query}`);
            return response.data;
        }catch (error) {
            if (error.response) {
                console.error("API response error data:", error.response.data);
                console.error("API  response error status", error.response.status);
                console.error("API response error headers", error.response.headers);
            
            } else if(error.request) {
                console.error("No response received", error.request);
            } else {
                console.error("Error setting up the request", error.message);
            }
            throw { message: 'Network error occurred'}
        }
    }
}


export default {
    authService,
    transService
};
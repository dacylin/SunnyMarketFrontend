import axios from "axios";
import useTokenStore from '@/stores/TokenCheck'
import { ref } from 'vue'

const message = ref('');

// 先建一个api
const api = axios.create({
    baseURL: "http://localhost:8080",
});

// Request 前檢查 token檢查 token
// api.interceptors.request.use(
//     config => {
//         const useToken = useTokenStore();
//         if (useToken.token) {
//             console.log("Header toekn：", useToken.token);
//             // Request Header
//             config.headers.Authorization = `Bearer ${useToken.token}`;        
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

export default api;

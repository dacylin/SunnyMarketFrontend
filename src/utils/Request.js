import axios from "axios";
import useTokenStore from '@/stores/TokenCheck'
import { ElMessage } from 'element-plus';

// 先建一个api
const api = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 5000
});
// Request 前檢查 token檢查 token
api.interceptors.request.use(
    config => {
        const useToken = useTokenStore();
        if (useToken.token) {
            console.log("Header toekn：", useToken.token);
            // Request Header
            config.headers.token = useToken.token;
        }
        return config;

    },
    error => {

        return Promise.reject(error);
    }
)

// Response 
api.interceptors.response.use(
    response => {
        console.log("Response數據：", response);
        if (response.data.code != 200) {
            ElMessage.error(response.data.message);
        }

        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export default api;

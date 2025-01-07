/* 1. TokenStore.js 包含獲取和設定 token 的方法
   2. 登出 可以調用 TokenStore.removeToken() 來移除 token
   3. 引用 TokenStore.js import TokenStore from "@/utils/TokenStore"; 
   4. 發送帶有 token 的 API 請求要用這個
const token = TokenStore.getToken();
if (token) {
  const response = await api.get("/api/protected/resource", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log("API response:", response);
} else {
  console.log("沒有 token，無法進行請求");
}
*/
import {jwtDecode} from "jwt-decode";

const TokenStore = {
  // 獲取 token
  getToken() {
    // 首先檢查 localStorage
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    // 如果 localStorage 沒有，則返回 null
    return null;
  },
  // 設置 token
  setToken(token) {
    const payload = this.decodeToken(token);
  
    localStorage.setItem("token", token);
    const userId = payload.userId;
    const email = payload.sub;
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
  },
  

  // 刪除 token（登出）
  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  },

  decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },
};

export default TokenStore;

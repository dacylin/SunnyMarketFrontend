<template>
  <Header />
  <div class="login-title">會員登入</div>
  <div class="router-text">
    <router-link to="/" class="homepage"><span>首頁</span></router-link
    ><span>&nbsp&nbsp&nbsp&nbsp&nbsp>&nbsp&nbsp&nbsp&nbsp&nbsp</span
    ><span>帳戶</span>
  </div>
  <div class="background">
    <div class="login-box">
      <p class="loginMessage">{{ message }}</p>
      <div class="login-label">登入</div>
      <form @submit.prevent="getLogin">
        <div class="form-item">
          <input
            type="email"
            id="loginEmail"
            placeholder="請輸入電子郵件"
            v-model="loginFrom.email"
            required
          />
        </div>
        <div class="form-item">
          <input
            type="password"
            id="loginPassword"
            placeholder="請輸入密碼"
            v-model="loginFrom.password"
            required
          />
        </div>
        <div class="forgotpassword">忘記密碼？</div>
        <div class="form-actions">
          <button type="submit">登入</button>
        </div>
        <div class="google-login">
          <button @click="googleLogin" class="google-login-button">
            使用 Google 登入
          </button>
        </div>
      </form>
    </div>
    <div class="register-box">
      <div class="register-label">新會員</div>
      <router-link to="/user/register" class="registerurl"
        ><div class="register-button">點此註冊</div></router-link
      >
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useTokenStore from "@/stores/TokenCheck.js";
import TokenStore from "@/utils/TokenStore"; // 引入 TokenStore
import api from "@/utils/Request.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";


const message = ref("");

const loginFrom = ref({
  email: "",
  password: "",
});

const tokenStore = useTokenStore();
const router = useRouter();

const getLogin = async () => {
  const response = await api.post("/api/user/login", loginFrom.value);
  if (response.data) {
    console.log("這是 response.data：", response.data);
    // 提取訊息和 Token
    message.value = response.data.message;
    localStorage.setItem("role" , response.data.role);
    tokenStore.token = response.data.token;
    console.log("獲取的 token：", tokenStore.token);

    //設置 token 在 TokenStore
    TokenStore.setToken(response.data.token);
    console.log("TokenStore 獲取的 token：", TokenStore.getToken());

    // 延遲 3 秒後跳轉首頁
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }
};

const googleLogin = async () => {
  try {
    const response = await api.get("/google/buildAuthUrl");
    if (response) {
      window.location.href = response.data.authUrl;
    } else {
      message.value = "Google 登入失敗，請再試一次";
    }
  } catch (error) {
    console.error("Google 登入失敗：", error);
    message.value = "Google 登入失敗，請稍後再試";
  }
};

// 從 URL 中提取 code 並傳送到後端
const handleGoogleRedirect = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const googleLoginRequest = { code };
      // 將 code 傳送給後端進行進一步處理
      const response = await api.post(
        "/google/getGoogleCode",
        googleLoginRequest
      );
      console.log("Google 用戶資訊：", response.data);
      TokenStore.setToken(response.data.token);
      localStorage.setItem("role", response.data.role)
      setTimeout(() => {
      router.push("/");
    }, 3000);
    } catch (error) {
      console.error("發送 code 到後端失敗：", error);
      message.value = "處理登入資訊失敗，請稍後再試";
    }
  } else {
    message.value = "請使用者登入";
  }
};

onMounted(() => {
  handleGoogleRedirect();
});
</script>

<style scoped>
.login-title {
  display: flex;
  justify-content: center;
  font-size: 28px;
  padding: 20px;
  background-color: rgb(230, 230, 230);
}

.router-text {
  background-color: rgb(230, 230, 230);
  display: flex;
  justify-content: center;
}

.background {
  background-color: rgb(230, 230, 230);
  min-height: 500px;
  display: flex;
  justify-content: center;
  gap: 100px;
}

.login-label {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-box {
  padding: 40px 0;
  width: 330px;
}

.register-box {
  padding: 40px 0;
  width: 330px;
}

.register-label {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
}

.form-item input {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions button {
  padding: 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
}

.register-button {
  padding: 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 40%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
}

.register-button:hover {
  background-color: gray;
}


.form-actions button[type="submit"] {
  background-color: black;
  color: white;
}

.form-actions button[type="submit"]:hover {
  background-color: grey;
  color: white;
}

.form-actions button[type="button"] {
  background-color: #f44336;
  color: white;
}

.captcha-image {
  width: 100px;
  cursor: pointer;
}

.forgotpassword {
  margin-bottom: 20px;
  cursor: pointer;
  width: fit-content;
}

.registerurl,
.homepage {
  text-decoration: none;
  color: inherit;
}

.google-login {
  margin-top: 20px;
}

.google-login-button {
  padding: 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  background-color: #4285f4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.google-login-button:hover {
  background-color: #357ae8;
}

.loginMessage {
  color: orangered;
  text-align: center;
}
</style>

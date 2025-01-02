<template>
<Header />
  <div class="login-title">會員登入</div>
  <div class="shit"><router-link to="/" class="homepage"><span>首頁</span></router-link><span>&nbsp&nbsp&nbsp&nbsp&nbsp>&nbsp&nbsp&nbsp&nbsp&nbsp</span><span>帳戶</span></div>
  <div class="background">
    <div class="login-box">
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
        <div class="forgotpassword">忘記密碼?</div>
        <div class="form-actions">
          <button type="submit">登入</button>
          {{ message }}
        </div>
      </form>
    </div>
    <div class="register-box">
      <div class="register-label">新會員</div>
      <router-link to = "/user/register" class="registerurl"><div class="register-button">會員註冊</div></router-link>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import useTokenStore from "@/stores/TokenCheck.js";
import api from "@/utils/Request.js";
import Header from "@/components/Header.vue"; // 引入 Header 元件
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件

const loginFrom = ref({
  email: "",
  password: "",
});
const tokenStore = useTokenStore();
const router = useRouter();
const message = ref("");

const getLogin = async () => {
  let { data } = await api.post("/api/user/login", loginFrom.value);
  if (data !== null) {
    message.value = data.message
    tokenStore.token = data.token;
    router.push("/")
  } else {
    message.value = data.message;
  }
};
</script>

<style scoped>
.login-title {
  display: flex;
  justify-content: center;
  font-size: 28px;
  padding: 20px;
  background-color: rgb(230, 230, 230);
}

.shit {
    background-color: rgb(230, 230, 230);
    display: flex;
    justify-content: center;
}

.background {

  background-color: #f6f1eb;
  height: 80vh;
}

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

.form-actions button[type="submit"] {
  background-color: black;
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
    color:inherit;
}
</style>

<template>
  <Header />
  <div class="register-title">會員註冊</div>
  <div class="shit">
    <router-link to="/"
      class="homepage"><span>首頁</span></router-link><span>&nbsp&nbsp&nbsp&nbsp&nbsp>&nbsp&nbsp&nbsp&nbsp&nbsp</span><span>建立帳戶</span>
  </div>
  <div class="background">
    <div class="register-box">
      <div class="register-card">
        <div class="register-label">會員註冊</div>
        <form @submit.prevent="registerAdd">
          <div class="form-item">
            <input type="email" id="Email" v-model="registerForm.email" placeholder="請輸入電子郵件" required />
          </div>
          <div class="form-item">
            <input type="password" id="Password" v-model="registerForm.password" placeholder="請輸入密碼" required />
          </div>
          <div class="form-item">
            <input type="password" id="ConfirmPassword" v-model="registerForm.confirmpassword" placeholder="請再次輸入密碼" required />
          </div>
          <div class="form-item">
            <input type="text" id="username" v-model="registerForm.username" placeholder="請輸入姓名" required />
          </div>
          <div class="form-item">
            <input type="date" id="birthday" v-model="registerForm.birthday" required />
          </div>
          <div class="form-item">
            <input type="text" id="address" v-model="registerForm.address" placeholder="請輸入住址" required />
          </div>
          <div class="form-item">
            <input type="tel" id="phone" v-model="registerForm.phoneNumber" placeholder="請輸入手機號碼" required />
          </div>
          <div class="form-actions">
            <button type="submit">會員註冊</button>
          </div>
        </form>
        <router-link to = "/user/login" class="loginurl"><button class="login-button">登入</button></router-link>
      </div>
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

const registerForm = ref({
  email: "",
  password: "",
  confirmpassword: "",
  birthday: "",
  username:"",
  address:"",
  phoneNumber:""
});

const isRegister = ref(false);

const tokenStore = useTokenStore();
const router = useRouter();

const registerAdd = async () => {
  let { data } = await api.post("/user/register", registerForm.value);
  if (data.code === 200) {
    isRegister.value = false;
  } else {
    alert("註冊失败");
  }
};
</script>

<style scoped>
.register-title {
  display: flex;
  justify-content: center;
  font-size: 28px;
  padding: 20px;
  background-color: #f6f1eb;
}

.shit {
  background-color: #f6f1eb;
  display: flex;
  justify-content: center;
}

.background {
  background-color: #f6f1eb;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 100px;
}

.register-label {
  font-size: 24px;
  margin-bottom: 20px;
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

.login-button {
  padding: 12px;
  font-size: 14px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  background-color: inherit;
  color: black;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: black;
  color: white;
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

.loginurl,
.homepage {
  text-decoration: none;
  color: inherit;
}
</style>

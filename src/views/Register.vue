<template>
  <Header />
  <div class="register-title">會員註冊</div>
  <div class="router-text">
    <router-link to="/" class="homepage"><span>首頁</span></router-link
    ><span>&nbsp&nbsp&nbsp&nbsp&nbsp>&nbsp&nbsp&nbsp&nbsp&nbsp</span
    ><span>建立帳戶</span>
  </div>
  <div class="background">
    <div class="register-box">
      <div class="register-card">
        <div class="register-label">會員註冊</div>
        <form @submit.prevent="validateAndRegister">
          <div v-for="(field, key) in fields" :key="key" class="form-item">
            <input
              :type="field.type"
              :id="key"
              v-model="registerForm[key]"
              :placeholder="field.placeholder"
              @blur="() => validateField(key)"
              required
            />
            <div v-if="errors[key]" class="error">{{ errors[key] }}</div>
          </div>
          <div class="form-actions">
            <button type="submit">會員註冊</button>
          </div>
        </form>
        <router-link to="/user/login" class="loginurl">
          <button class="login-button">回登入頁</button>
        </router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/Request.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const registerForm = ref({
  email: "",
  password: "",
  confirmpassword: "",
  birthday: "",
  username: "",
  address: "",
  phoneNumber: "",
});

const errors = ref({});

const fields = {
  email: { type: "email", placeholder: "請輸入電子郵件", validate: "email" },
  password: {
    type: "password",
    placeholder: "請輸入密碼",
    validate: "password",
  },
  confirmpassword: {
    type: "password",
    placeholder: "請再次輸入密碼",
    validate: "confirmPassword",
  },
  username: { type: "text", placeholder: "請輸入姓名", validate: "required" },
  birthday: { type: "date", placeholder: "請輸入生日", validate: "required" },
  address: { type: "text", placeholder: "請輸入住址", validate: "required" },
  phoneNumber: {
    type: "tel",
    placeholder: "請輸入手機號碼",
    validate: "phoneNumber",
  },
};

const router = useRouter();

const validateField = (key) => {
  const value = registerForm.value[key];
  const rule = fields[key]?.validate;

  switch (rule) {
    case "email":
      errors.value[key] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "請輸入有效的電子郵件";
      break;
    case "password":
      errors.value[key] = value.length >= 6 ? "" : "密碼長度至少為6個字符";
      break;
    case "confirmPassword":
      errors.value[key] =
        value === registerForm.value.password ? "" : "密碼不一致";
      break;
    case "phoneNumber":
      errors.value[key] = /^09\d{8}$/.test(value)
        ? ""
        : "請輸入有效的手機號碼 (09XXOOOXXX)";
      break;
    case "required":
      errors.value[key] = value ? "" : "此欄位不可為空";
      break;
    default:
      errors.value[key] = "";
  }
};

const validateAndRegister = () => {
  Object.keys(fields).forEach((key) => validateField(key));

  const hasErrors = Object.values(errors.value).some((error) => error);

  if (!hasErrors) {
    registerAdd();
  }
};

const registerAdd = async () => {
  try {
    const { data } = await api.post("/api/user/register", registerForm.value);
    if (data) {
      alert("註冊成功");
      setTimeout(() => router.push("/user/Login"), 3000);
    } else {
      alert("註冊失敗");
    }
  } catch (error) {
    alert("發生錯誤，請稍後再試");
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}

.register-title {
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

.form-actions button[type="submit"]:hover {
  background-color: grey;
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

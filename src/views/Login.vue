<template>
    <div class="background" style="font-family:kaiti">

        <!-- 註冊卡片 -->
        <div v-if="isRegister" class="register-card">
            <h3>使用者註冊</h3>
            <form @submit.prevent="registerAdd">
                <div class="form-item">
                    <label for="registerEmail">電子郵件</label>
                    <input type="email" id="registerEmail" v-model="registerForm.email" required />
                </div>
                <div class="form-item">
                    <label for="registerPassword">密碼</label>
                    <input type="password" id="registerPassword" v-model="registerForm.password" required />
                </div>
                <div class="form-actions">
                    <button type="submit">註冊</button>
                    <button type="button" @click="isRegister = false">取消</button>
                </div>
            </form>
        </div>

        <!-- 登入卡片 -->
        <div class="login-box">
            <h3>使用者登入</h3>
            <form @submit.prevent="getLogin">
                <div class="form-item">
                    <label for="loginEmail">電子郵件</label>
                    <input type="email" id="loginEmail" v-model="loginFrom.email" required />
                </div>
                <div class="form-item">
                    <label for="loginPassword">密碼</label>
                    <input type="password" id="loginPassword" v-model="loginFrom.password" required />
                </div>
                <div class="form-item">
                    <label for="loginCode">驗證碼</label>
                    <input type="text" id="loginCode" v-model="loginFrom.codeValue" required />
                    <img :src="codeImage" @click="getCode" class="captcha-image" />
                </div>
                <div class="form-actions">
                    <button type="submit">登入</button>
                    <button type="button" @click="isRegister = true">註冊</button>
                </div>
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useTokenStore from '@/stores/TokenCheck.js';
import api from '@/utils/Request.js';

const loginFrom = ref({
    email: '',
    password: '',
    codeKey: '',
    codeValue: ''
});

const registerForm = ref({
    email: '',
    password: ''
});

const codeImage = ref('');

const isRegister = ref(false);

const tokenStore = useTokenStore();
const router = useRouter();

const getLogin = async () => {
    let { data } = await api.post('/user/login', loginFrom.value);
    if (data.code === 200) {
        tokenStore.token = data.data;
        router.replace({ name: 'layout' });
    } else {
        alert('登入失败');
    }
};

const getCode = async () => {
    let { data } = await api.get('/getCaptcha');
    loginFrom.value.codeKey = data.data.codeKey;
    codeImage.value = data.data.codeValue;
};

const registerAdd = async () => {
    let { data } = await api.post('/user/register', registerForm.value);
    if (data.code === 200) {
        isRegister.value = false;
    } else {
        alert('註冊失败');
    }
};

onMounted(() => {
    getCode();
});
</script>

<style scoped>
.background {
    background: url("@/assets/20.png");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
    font-family: kaiti;
}

.register-card,
.login-box {
    border: 1px solid #dccfcf;
    width: 350px;
    margin: 180px auto;
    padding: 20px 50px;
    border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: rgba(255, 255, 255, 0.7);
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
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.form-actions {
    display: flex;
    justify-content: space-between;
}

.form-actions button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.form-actions button[type="submit"] {
    background-color: #4CAF50;
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
</style>
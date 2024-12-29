<template>
    <div class="background" style="font-family:kaiti">

        <!-- 註冊卡片 -->
        <el-dialog v-model="isRegister" title="使用者註冊" width="30%">
            <el-form label-width="120px" v-model="registerForm">
                <el-form-item label="電子郵件">
                    <el-input type="text" v-model="registerForm.email">
                        <template #prefix>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input type="password" v-model="registerForm.password">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="registerAdd">註冊</el-button>
                    <el-button @click="isRegister = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 登入卡片 -->
        <div class="login-box">
            <el-form label-width="100px" :model="loginFrom" style="max-width: 460px" :rules="Loginrules"
                ref="ruleFormRef">
                <el-form-item label="電子郵件" prop="email">
                    <el-input v-model="loginFrom.email" clearable>
                        <template #prefix>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密碼" prop="password">

                    <el-input v-model="loginFrom.password" show-password clearable type="password">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="驗證碼" prop="codeValue">
                    <el-input v-model="loginFrom.codeValue" style="width: 100px;" clearable>
                    </el-input>
                    <img :src="codeImage" @click="getCode" style="transform: scale(0.9);" />
                </el-form-item>

                <el-button type="success" @click="getLogin(ruleFormRef)" style="transform: translateX(50px)"
                    class="my-button">登入</el-button>
                <el-button type="primary" @click="isRegister = true" class="my-button">註冊</el-button>
            </el-form>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import useTokenStore from '@/stores/TokenCheck.js';
import api from '@/utils/Request.js';
import { ElForm } from 'element-plus';

const loginFrom = ref({
    email: '',
    password: '',
    codeKey: '',
    codeValue: ''
});

const Loginrules = reactive({
    email: [
        { required: true, message: '請輸入email', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 6, max: 12, message: '長度在 6 到 12 个字母', trigger: 'blur' }
    ],
    codeValue: [
        { required: true, message: '請輸入驗證碼', trigger: 'blur' }
    ]
});

const registerForm = ref({
    email: '',
    password: ''
});

const codeImage = ref('');

const isRegister = ref(false);

const tokenStore = useTokenStore();

const router = useRouter();

const getLogin = async (formEl) => {
    if (!formEl) return;

    await formEl.validate((valid) => {
        if (valid) {
            console.log('submit!');
        } else {
            ElMessage('請輸入完整訊息');
            return;
        }
    });

    let { data } = await api.post('/user/login', loginFrom.value);

    if (data.code == 200) {
        ElMessage('登入成功');
        console.log(data);
        tokenStore.token = data.data;
        router.replace({ name: 'layout' });
    } else {
        ElMessage('登入失败');
    }
};

const getCode = async () => {
    let { data } = await api.get('/getCaptcha');
    loginFrom.value.codeKey = data.data.codeKey;
    codeImage.value = data.data.codeValue;
};

const registerAdd = async () => {
    let { data } = await api.post('/user/register', registerForm.value);

    if (data.code == 200) {
        ElMessage('註冊成功');
        isRegister.value = false;
    } else {
        ElMessage('註冊失败');
        isRegister.value = false;
    }
};

// 页面加载完成获取验证码

onMounted(() => {
    getCode();
});

</script>

<style scoped>
.background {
    background: url("@/assets/20.png");
    width: 100%;
    height: 100%;
    /**宽高100%是为了图片铺满屏幕 */
    position: fixed;
    background-size: 100% 100%;
    font-family: kaiti
}

.login-box {
    border: 1px solid #dccfcf;
    width: 350px;
    margin: 180px auto;
    padding: 20px 50px 20px 50px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: rgba(255, 255, 255, 0.7);
}


.my-button {
    margin-right: 100px;
}
</style>

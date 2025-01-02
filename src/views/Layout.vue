<template>
    <div class="common-layout">
        <div class="header">
            頂部
            <button class="btn-primary" @click="getUserInfo">獲取使用者訊息</button>
            <button class="btn-success" @click="Logout">登出</button>
        </div>

        <div class="container">
            <aside class="aside">
                菜單欄
            </aside>
            <main class="main">
                展示區
            </main>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import api from '@/utils/Request';
import useTokenStore from '@/stores/TokenCheck';

const router = useRouter();

const Logout = async () => {
    let { data } = await api.get("/user/logout");
    if (data.data.code === 200) {
        alert('登出成功');
        // 清除token
        useTokenStore().removeToken();
        router.replace({ name: 'login' });
    } else {
        alert('登出失敗');
    }
};

const getUserInfo = async () => {
    let { data } = await api.get("/user/info");
    console.log('@', data);
};
</script>

<style scoped>
.common-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    height: 100px;
    background-color: rgb(230, 230, 230);
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.container {
    display: flex;
    flex: 1;
}

.aside {
    width: 200px;
    background-color: black;
    color: white;
    padding: 20px;
}

.main {
    flex: 1;
    background-color: #f0f2f5;
    padding: 20px;
}

button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.btn-primary {
    background-color: #409EFF;
    color: white;
}

.btn-success {
    background-color: #67C23A;
    color: white;
    margin-left: 10px;
}
</style>
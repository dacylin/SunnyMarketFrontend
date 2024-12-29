<template>
    <div class="common-layout">
        <el-container>
            <el-header height="100px">
                頂部
                <el-button type="primary" @click="getUserInfo">獲取使用者訊息</el-button>
                <el-button type="success" @click="Logout">登出</el-button>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    菜單欄
                </el-aside>
                <el-main>
                    展示區
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script setup name="Layout">
import { ref } from 'vue';
import api from '@/utils/Request';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import useToeknStore from '@/stores/TokenCheck';
const router = useRouter();

const Logout = async () => {
    let data = await api.get("/user/logout");
    if (data.data.code === 200) {
        ElMessage.success('退出成功');
        // 清除token
        useToeknStore().removeToken();
        router.replace({ name: 'login' });
    } else {
        ElMessage.error('退出失败');
    }
};

const getUserInfo = async () => {
    let data = await api.get("/user/info");
    console.log('@', data);
};

</script>

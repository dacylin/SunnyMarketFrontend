<!-- html文字設定 -->
<template>
    <div class="sidebar">
        <div class="header_container">
            <img class="logo" src="../assets/sunnymarket_nobg.png" alt="Logo" />
            <div class="headertext">
                <span class="headertext1"><(●'◡'●)></span>
                <span class="headertext2">後台管理</span>
            </div>
        </div>
        <div class="sidebarlist">
            <ul class="navlist">
                <li :class="{ active: activeIndex === 0 }" @click="setActive(0, usertablelist)">使用者管理列表</li>
                <li :class="{ active: activeIndex === 1 }" @click="setActive(1, producttablelist)">商品管理列表</li>
                <li class="logoutButton" @click="logout">登出</li>
            </ul>
        </div>
    </div>
</template>

<!-- js設定 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const activeIndex = ref(null);
const router = useRouter();
const route = useRoute();

const usertablelist = '/adminbackend/usertablelist';
const producttablelist = '/adminbackend/producttablelist';

// 根據路由初始化 activeIndex
const setInitialActiveIndex = () => {
    const path = route.path;
    if (path.includes('/adminbackend/usertablelist')) {
        activeIndex.value = 0;
    } else if (path.includes('/adminbackend/producttablelist')) {
        activeIndex.value = 1;
    }
};

// 設置選中的列表項
const setActive = (index, routePath) => {
    activeIndex.value = index;
    router.push(routePath);
};

// 初始化 activeIndex
onMounted(() => {
    setInitialActiveIndex();
});
</script>

<!-- css設定 -->
<style scoped>
.sidebar {
    width: 240px;
    height: 100vh;
    background:rgba(100, 100, 100, 0.1); 
    padding-top: 20px;
    margin-right: 20px;
    position: relative;
}

.header_container {
    margin: 20px;
}

.logo {
    width: 100%;
    margin-bottom: 20px;
}

.sidebarlist {
    margin-top: 40px;
}

.headertext {
    display: flex;
    gap: 20px;
    justify-content: center;
    color:gray;
}

.headertext1 {
    font-size: 16px;
   
}

.headertext2 {
    font-size: 16px;
    
}

.navlist {
    list-style-type: none;
    padding: 0;
    margin-left: 20px;
}

.navlist li {
    color: dimgray;
    margin-bottom: 24px;
    padding: 10px 0;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    transition: all 0.3s ease;
}

.navlist li:hover {
    color: orangered;
    
}

.navlist li.active {
    color: orange;
    font-weight: bold;
}

/* 滑動底線效果 */
.navlist li.active::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: orange;
    transition: width 0.5s ease;
}

.navlist li::after {
    content: '';
    position: absolute;
    width: 0%;
    /* 初始狀態，底線為0 */
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: black;
    transition: width 0.5s ease;
}
</style>
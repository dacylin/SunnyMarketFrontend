<!-- 會員中心 -->
<template>
  <main class="flex">
    <UserSidebar />
    <router-view />
  </main>
</template>

<script setup>
import UserSidebar from "@/components/userCenter/UserSidebar.vue";
</script>
<style scoped>
.flex {
  display: flex;
}
</style>

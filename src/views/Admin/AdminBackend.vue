<template>
  <main class="flex">
    <AdminSidebar />
    <router-view />
  </main>
</template>

<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue';
</script>

<style scoped>
.flex {
  display: flex;
}
</style>
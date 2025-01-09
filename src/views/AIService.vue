<template>
  <Header />
  <div class="ai-contain">
    <h1>客服中心</h1>
  </div>
  <Footer />
  <TopButton />
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TopButton from "../components/TopButton.vue";
</script>

<style scoped>
.ai-contain {
  background: lightgoldenrodyellow;
  min-height: 700px;
  display: flex;
  justify-content: center;
}
</style>

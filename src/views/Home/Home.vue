<template>
  <main>
    <Slider />
    <HomeIntro />
  <div class="testh1">
    <h1>gogogogo</h1>
    <h1>gogogogo</h1>
    <h1>gogogogo</h1>
    <h1>gogogogo</h1>
    <h1>gogogogo</h1>
  </div>
</main>
</template>

<script setup>
import Slider from "@/components/Slider.vue"; // 引入 Slider 元件
import HomeIntro from "./HomeIntro.vue";
</script>

<style scoped>


main {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: rgb(230, 230, 230);
}
.testh1 {
  color: gray;
}
</style>

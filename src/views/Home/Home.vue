<template>
  <Header />
    <main>
      <Slider />
      <HomeIntro />
      <TopButton />
    </main>
  
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue"; // 引入 Header 元件
import Slider from "@/components/Slider.vue"; // 引入 Slider 元件
import HomeIntro from "./HomeIntro.vue";
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件
import TopButton from "@/components/TopButton.vue"; //引入 TopButton 元件

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
</style>

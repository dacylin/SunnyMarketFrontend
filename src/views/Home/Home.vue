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
import HomeIntro from "./HomeIntro.vue";// 引入 HomeIntro 元件
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件
import TopButton from "@/components/TopButton.vue"; //引入 TopButton 元件

</script>

<style scoped>
h1{
  margin-top: 50px 0 ;

}
main {
  width: 1350px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}
</style>

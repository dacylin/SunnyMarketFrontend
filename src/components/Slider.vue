<template>
  <div class="slider">
    <div class="carousel" @mouseover="pause" @mouseleave="resume">
      <div
        class="carousel-item"
        :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }"
        v-for="(item, index) in images"
        :key="index"
      >
        <img :src="item" alt="Slider Image" />
      </div>
      <!-- 左側按鈕 -->
      <button class="prev" @click="prev">❮</button>
      <!-- 右側按鈕 -->
      <button class="next" @click="next">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 圖片數據
const images = ref([
  "https://im1.book.com.tw/image/getImage?i=https://addons.books.com.tw/G/ADbanner/fashion/i/2024/11/clothesvip/1223clothesvip_902x360.jpg&v=6762484ak&w=902&h=360",
  "https://im1.book.com.tw/image/getImage?i=https://addons.books.com.tw/G/ADbanner/2024/10/taRot/902x360b.jpg&v=6721f6d6k&w=902&h=360",
  "https://im1.book.com.tw/image/getImage?i=https://addons.books.com.tw/G/ADbanner/2024/11/locuseb_902360.jpg&v=67491054k&w=902&h=360",
]);

// 目前顯示的圖片索引
const currentIndex = ref(0);

// 自動輪播的 interval ID
let intervalId = null;

// 切換到下一張圖片
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

// 切換到上一張圖片
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// 啟動自動輪播
const startCarousel = () => {
  intervalId = setInterval(next, 3000); // 每3秒換一張圖片
};

// 停止自動輪播
const pause = () => {
  clearInterval(intervalId);
};

// 恢復自動輪播
const resume = () => {
  startCarousel();
};

// 啟動自動輪播
onMounted(() => {
  startCarousel();
});

// 清除 interval
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  top: -10px; /*控制slider在main中央*/ 

}

.carousel {
  display: flex;
  overflow: hidden;
  position: relative;
}

.carousel-item {
  min-width: 100%;
  transition: transform 0.5s ease;
}

.carousel img {
  width: 100%;
  height: auto;
  display: block;
}

button {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30px; /* Adjust button width */
  background-color: rgba(100, 100, 100, 0.1); 
  color: white;
  border: none;
  padding: 0;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.5s;
  border-radius: 0; /* 取消圓角，變為直角 */
}

button:hover {
  background-color: rgba(100, 100, 100, 0.5); 
}
.prev {
  left: 0;
}

.next {
  right:0;
}

.controls {
  margin-top: 10px;
}
</style>

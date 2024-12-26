<template>
  <div class="slidercontain">
    <div class="sliderdiv" @mouseover="pause" @mouseleave="resume">
      <div
        class="slideritem"
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
  "https://img.leezen.com.tw/upload/images/898cccb70a1f069f9075f547e3c0fd25.jpg",
  "https://images.plurk.com/5ePHYzY3c1uktbhdLvChVQ.png",
  "https://images.plurk.com/1acg5IibdSa4OSs7tSeHoG.png",
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
.slidercontain {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 30px auto;
  text-align: center;
  top:20px;
}

.sliderdiv {
  display: flex;
  overflow: hidden;
  position: relative;
}

.slideritem {
  width: 1000px;
  height: 400px;
  min-width: 100%;
  transition: transform 0.5s ease;
}

.slideritem img {
  width: 100%;  
  height: 100%; 
  object-fit: cover;  /* 確保圖片按比例拉伸並填滿容器 */
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

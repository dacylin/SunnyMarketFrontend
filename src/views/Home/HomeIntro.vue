<template>
  <h1 ref="h1text">安心信賴 天然選品</h1>

  <div class="homeintro">
    <div class="content">
      <p>
        <span class="highlight">Sunny Market</span> 與
        <span class="highlight">花蓮夥伴</span> 攜手合作
      </p>
      <p>吉安鄉契作農家用心耕耘、悉心栽培</p>
      <p>利用精選農產推出美味麵包、糕點</p>
      <p>一起將這片土地的美好帶到您身邊</p>
      <p>讓您品嚐最地道的自然風味</p>
    </div>
    <img
      src="https://www.leezen.com.tw/assets/images/index/results/banner.jpg"
      alt="預設是稻田圖片"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"; //引入 watch 觀察 下滑
const h1text = ref(null); // 設置 h1 的 ref
const isScrolled = ref(false); // 判斷是否滾動至該元素

// 滾動監聽器
const handleScroll = () => {
  const rect = h1text.value.getBoundingClientRect(); // 取得 h1 元素的位置
  const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0; // 判斷是否進入視窗
  isScrolled.value = isVisible; // 更新狀態
};

// 當 isScrolled 變化時，根據其值來更新 h1 類別
watch(isScrolled, (newVal) => {
  if (h1text.value) {
    if (newVal) {
      h1text.value.classList.add("activated"); // 滾動至可見範圍時添加類別
    } else {
      h1text.value.classList.remove("activated"); // 滾動出視窗時移除類別
    }
  }
});
onMounted(() => {
  window.addEventListener("scroll", handleScroll); // 監聽滾動事件
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll); // 卸載事件監聽
});
</script>

<style scoped>
.highlight{
  color: #ff8000; /*橘色*/

}

h1 {
  color: #709d00; /* 綠色 */
  letter-spacing: 7px;
  margin: 50px 0;
  opacity: 0.3; /* 初始為透明 */
  transform: translateY(20px); /* 初始位移 */
  transition: opacity 3s ease, transform 3s ease; /* 漸變過渡效果 */
}

/* 當 h1 滾動進來時的樣式 */
h1.activated {
  opacity: 1; /* 顯示文字 */
  transform: translateY(0); /* 恢復原來位置 */
  position: relative;
}

h1.activated::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #709d00; /* 綠色 */
}

.homeintro {
  position: relative; /* 讓容器成為定位的參考 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: dimgray; /* rgb(70, 100, 0);  綠色 */
  font-size: 30px;
  line-height: 2.5; /*控制每行間距 */
}
.content {
  position: absolute; /* 讓文字層浮在圖片上 */
  top: 20%;
  left: 10%;
}
.content p {
  font-weight: 750; /* 比bold再粗一點 */
}

.homeintro img {
  margin-top: 50px;
  width: 100%;
  height: auto;
}
</style>

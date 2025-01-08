<!-- header 的 購物車按鈕，有一個svg，上面有購物車數字 -->

<template>
  <router-link to="/cart">
    <div class="cartbtn">
      <div class="total">
        {{ totalQuantity }}
      </div>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="cartsvg"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
        />
      </svg>
    </div>
  </router-link>
</template>

<script setup>
//抓購物車數量
import { useCartStore } from '@/stores/cartStore'; //載入pinia
import { storeToRefs } from 'pinia' // 可以使用方法

//顯示購物車商品總數量
  // 初始化 Pinia 的 store
  const cartStore = useCartStore();

  // 使用 storeToRefs 解構 state 和 getters
  const {totalQuantity} = storeToRefs(cartStore)

</script>

<style scoped>
.total {
  position: absolute; /* 絕對定位相對於 cartbtn */
  top: -0.5em; /* 將文字移到 SVG 上方 */
  right: 2em; 
  z-index: 1000; /* 確保在畫面上層 */
  font-size: 16px;
  font-weight: bold; /* 加粗文字 */
  color: white;
  background: tomato;
  border-radius: 50%;
  width: 1.5em; /* 設定固定寬度 */
  height: 1.5em; /* 設定固定高度 */
  display: flex; /* 使用 flex 將文字置中 */
  justify-content: center;
  align-items: center;
}

.cartbtn {
  position: fixed; /* 固定位置 */
  right: 3em; /* 與畫面右邊距離 */
  bottom: 7em; /* 卡在 ScrollTopBtn 上方，調整間距 */
  width: 3em; /* 設置圓形大小 */
  height: 3em; /* 設置圓形大小 */
  background: rgb(150, 200, 0); 
  border-radius: 50%;
  display: flex; /* 讓內容居中 */
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(100, 100, 100, 0.5); /* 增加陰影效果 */
  cursor: pointer;
  z-index: 999; /* 確保在畫面上層 */
 
  /*transition: all 0.3s ease;  增加平滑效果 */
}

.cartbtn:hover {
  background:rgb(150, 200, 0, 0.7);
}

.cartsvg {
  fill: white; /* 調整 SVG 顏色 */
  width: 1.5em; /* 調整 SVG 大小 */
  height: 1.5em;
}
</style>

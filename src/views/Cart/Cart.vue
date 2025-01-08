<template>
<Header />
<div>
  <h1>購物車</h1>
  <table v-if="items.length > 0" border="1">
      <thead>
        <tr>
          <th>商品圖片</th>
          <th>商品Id</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th>數量</th>
          <th>小計</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>
            <img :src="item.imageUrl" alt="商品圖片" style="width: 100px; height: auto;" />
          </td>
          <td>{{ item.productId }}</td>  
          <td>{{ item.productName }}</td>        
          <td>${{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ item.price * item.quantity }}</td>
          <td>
            <button @click="() => { console.log('按鈕點擊移除:', item.productId); removeItem(item.productId); }">移除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>購物車是空的！</p>
    <p>🧾 總金額: ${{ totalPrice }}</p>
    <p>📦 總數量: {{ totalQuantity }}</p>
    <button @click="clearCart">清空購物車</button>

</div>
<TopButton/>
<Footer />

</template>
<script setup>
import Header from '@/components/Header.vue'
import TopButton from '@/components/TopButton.vue'
import Footer from '@/components/Footer.vue'
import { useCartStore } from '@/stores/cartStore'; //載入pinia
import { storeToRefs } from 'pinia' // 可以使用方法

// 初始化 Pinia 的 store
const cartStore = useCartStore();

// 使用 storeToRefs 解構 state 和 getters
const {items, totalPrice, totalQuantity} = storeToRefs(cartStore)
// 直接從 store 中使用 actions
const { removeItem, clearCart } = cartStore;
console.log('items 值的實際資料:', items); 
</script>

<style scoped>
/* 設定購物車容器 */
div {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* 表格樣式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #007bff;
  color: #fff;
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

/* 商品圖片樣式 */
img {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}

/* 按鈕樣式 */
button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #ff4d4f;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #ff7875;
}

button:active {
  background-color: #d9363e;
}

/* 清空按鈕樣式 */
button:last-child {
  background-color: #007bff;
}

button:last-child:hover {
  background-color: #0056b3;
}

p {
  font-size: 16px;
  color: #333;
  margin-top: 20px;
}

/* 總金額與總數量的文字樣式 */
p:nth-child(3), p:nth-child(4) {
  font-weight: bold;
  text-align: right;
  color: #555;
}
</style>

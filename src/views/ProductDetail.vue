<template>
  <Header />

  <div class="container">
    <div class="imgdiv">
      <img :src="product.imageUrl" alt="Product Image 預定顯示圖片" />
    </div>
    <div class="content">
      <span v-if="product.category === 'SEAFOOD'" class="category seafood">
        SEAFOOD
      </span>
      <span v-else class="category food"> FOOD </span>
      <h2>{{ product.productName }}</h2>
      <h4>產品介紹</h4>
      <p>{{ product.description }}</p>
      <h3>NT$ {{ product.price }}</h3>
      <button class="add-to-cart" @click.stop="addToCart(product)">
        加入購物車
      </button>
    </div>
  </div>
  <TopButton />
  <CartBtn />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue"; // 引入 Header 元件
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件
import TopButton from "@/components/TopButton.vue"; // 引入 TopButton 元件
import CartBtn from "@/components/CartBtn.vue";
import { useCartStore } from "@/stores/cartStore"; // 引入Store

const product = ref({}); // 商品列表

// 路由
const route = useRoute();
const productId = route.params.productId;

//加入購物車
const cartStore = useCartStore(); 

const addToCart = (product) => {
  console.log("點擊加入購物車，傳入的商品:", product);
  console.log("點擊加入購物車，商品 ID:", product.productId);
  cartStore.addItem(product); // 這裡會呼叫 cartStore 的 addItem
};

// 定義方法來獲取商品資料
const getProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}`
    );
    if (response.ok) {
      const data = await response.json();
      product.value = data;
    } else {
      console.error("商品未找到");
    }
  } catch (error) {
    console.error("錯誤: 無法獲取商品資料", error);
  }
};

// 在組件掛載時發送請求
onMounted(() => {
  getProductDetails(productId);
});
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

/* 控制圖片 class */
.imgdiv {
  width: 400px;
  /* 圖片寬度 */
  height: auto;
  /* 圖片高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgdiv img {
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* 控制文字 class */
.content {
  display: flex;
  flex-direction: column;
  width: 400px;/* 圖片寬度 */
  height: 400px;/* 圖片高度 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* 增加陰影 */
  padding: 40px;
  gap: 10px;
}

.category {
  display: inline-block;
  font-weight: bold;
  border-radius: 5px;
}

.category.food {
  color: coral;
  font-size: 1em;
}

.category.seafood {
  color: skyblue;
  font-size: 1em;
}

h2{
  margin: 0;
}

h4 {
  margin: 5px 0;
  color: dimgray;
}

h3 {
  margin: 5px 0;
  color: orangered;
}

/* 加入購物車按鈕 */
.add-to-cart {
  background-color: #7b5e36;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
  margin-bottom: 10px;
  font-size: 1em;
}

.add-to-cart:hover {
  background-color: #a07b47;
}
</style>

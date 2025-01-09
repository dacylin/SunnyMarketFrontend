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
      <span v-else class="category food">
        FOOD
      </span>
      <h2>{{ product.productName }}</h2>
      <h4>產品介紹</h4>
      <p>{{ product.description }}</p>
      <h3>NT$ {{ product.price }}</h3>
      <button @click="addToCart(product)">加入購物車</button>

    </div>
  </div>
  <TopButton />
  <CartBtn />
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue"; // 引入 Header 元件
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件
import TopButton from "@/components/TopButton.vue"; // 引入 TopButton 元件
import CartBtn from "@/components/CartBtn.vue"; 
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore"; // 引入Store 

// 使用 `ref` 定義資料
const product = ref({});
// 數量按鈕控制
const quantity = ref(1);

// 路由
const route = useRoute();
const productId = route.params.productId;
//加入購物車
const cartStore = useCartStore();
const addToCart = (product) => {
  cartStore.addItem(product);
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
  width: 400px;
  /* 圖片寬度 */
  height: 400px;
  /* 圖片高度 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* 增加陰影 */
  padding: 30px;
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

h4 {
  color: dimgray;
}

h3 {
  color: orangered;
}


.cartbtn {
  background-color: darkorange;
  color: white;
  border: none;
  font-size: 1em;
  padding: 10px;
  border-radius: 5px;
}

.cartbtn:hover {
  background-color: rgb(255, 140, 0, 0.7);
}
</style>

<template>
  <div class="product-card">
    <img :src="imageUrl" alt="Product Image" class="product-image" />
    <h3 class="product-title">{{ productName }}</h3>
    <p class="product-category">類別：{{ category }}</p>
    <p class="product-price">NT${{ price }}</p>
    <p class="product-description">{{ description }}</p>
    <button class="add-to-cart-btn">加入購物車</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  productId: Number,
  category: String,
  productName: String,
  imageUrl: String,
  price: Number,
  stock: Number,
  description: String,
});
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 10px;
  margin: 5px;
  border: none;
  /*box-shadow: 0px 0px 10px rgb(0 0 0 / 20%);*/
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.5);
  background-color: #fff;
  border-radius: 5%;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5%;
}

.product-title,
.product-price,
.product-stock,
.product-category,
.product-description,
.product-dates {
  margin: 5px 0;
}

.add-to-cart-btn {
  background-color: #ff8000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #e67300;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

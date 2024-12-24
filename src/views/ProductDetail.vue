<template>
  <div>
    <h1>{{ product.name }}</h1>
    <p>{{ product.productId }}</p>
    <p>{{ product.category }}</p>
    <img :src="product.imageUrl" alt="Product Image" />
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 使用 `ref` 定義資料
const product = ref({})

// 使用 `useRoute` 獲取路由參數
const route = useRoute()
const productId = route.params.productId

// 定義方法來獲取商品資料
const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`)
    if (response.ok) {
      const data = await response.json()
      product.value = data
    } else {
      console.error('商品 not found')
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

// 在組件掛載時發送請求
onMounted(() => {
  getProductDetails(productId)
})
</script>

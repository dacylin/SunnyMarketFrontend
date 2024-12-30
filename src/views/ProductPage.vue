<template>
<Header />
  <div class="select-container">
    <label for="category-select">選擇商品類別</label>
    <select
      id="category-select"
      v-model="selectedCategory"
      @change="fetchProducts"
    >
      <option value="">全部商品</option>
      <option value="FOOD">食品</option>
      <option value="SEAFOOD">海鲜</option>
    </select>
  </div>

  <div class="product-container-controller">
    <div class="product-container">
      <ProductCard
        v-for="product in products"
        :key="product.product_id"
        :productId="product.product_id"
        :category="product.category"
        :productName="product.productName"
        :imageUrl="product.imageUrl"
        :price="product.price"
        :stock="product.stock"
        :description="product.description"
      />
    </div>
  </div>

  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">
      上一頁
    </button>
    <span>第 {{ currentPage }} 頁，共 {{ totalPages }} 頁</span>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage >= totalPages"
    >
      下一頁
    </button>
  </div>
  <Footer />
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import ProductCard from "./ProductCard.vue";
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

const selectedCategory = ref("");
const products = ref([]);
const currentPage = ref(1);
const pageSize = ref(12);
const totalRecords = ref(0);

const totalPages = computed(() =>
  Math.ceil(totalRecords.value / pageSize.value)
);

const fetchProducts = async (page) => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/getAllProducts", {
      params: {
        pageNum: currentPage.value,
        pageSize: 12,
        category: selectedCategory.value,
      },
    });
    
    products.value = response.data.list;
    totalRecords.value = response.data.total;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchProducts();
  }
};

onMounted(fetchProducts);
</script>



<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.product-container-controller {
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 1200px;
  margin: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 0.5em 1em;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}
</style>
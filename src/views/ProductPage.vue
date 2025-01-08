<template>
  <Header />
  <div class="page-container">
    <!-- 分類篩選和排序 -->
    <div class="sort-options">
      <div class="sort-center">
        <!-- 搜尋欄位 -->
        <div class="search-box">
          <input type="text" v-model="search">
          <button class="searchBtn" @click="searchBtn">產品搜尋</button>
        </div>
        <!-- 分類篩選 -->
        <div class="sort-item">
          <label for="category-select">分類篩選</label>
          <select
            id="category-select"
            v-model="selectedCategory"
            @change="onCategoryChange"
          >
            <option value="">全部商品</option>
            <option value="FOOD">食品</option>
            <option value="SEAFOOD">海鲜</option>
          </select>
        </div>


        <!-- 排序依據 -->
        <div class="sort-item">
          <label for="sort-data">排序依據</label>
          <select id="sort-data" v-model="selectedSort" @change="fetchProducts">
            <option value="create_date">日期</option>
            <option value="price">價格</option>
          </select>
        </div>

        <!-- 排序方式 -->
        <div class="sort-item">
          <label for="order-price">排序方式</label>
          <select
            id="order-price"
            v-model="selectedOrder"
            @change="fetchProducts"
          >
            <option value="ASC">升冪</option>
            <option value="DESC">降冪</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="product-container">
      <div class="product-grid">
        <div
          v-for="product in products"
          :key="product.id"
          :to="`/products/${product.productId}`"
          class="product-card"
        >
          <img :src="product.imageUrl" alt="商品圖片" class="product-image" />
          <div class="product-details">
            <h3 class="product-title">{{ product.productName }}</h3>
            <p class="product-category">{{ product.productId }}</p>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">NT$ {{ product.price }}</p>
            <p class="product-description">{{ product.description }}</p>
          </div>
          <button class="add-to-cart" @click="addToCart(product)">加入購物車</button>
        </div>
      </div>
    </div>

    <!-- 分頁功能 -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="changePage(page - 1)" :disabled="page === 1">
        上一頁
      </button>
      <span>第 {{ page }} 頁 | 共 {{ totalPages }} 頁</span>
      <button @click="changePage(page + 1)" :disabled="page === totalPages">
        下一頁
      </button>
    </div>
  </div>
  <TopButton />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue"; // 引入 Header 元件
import Footer from "@/components/Footer.vue"; // 引入 Footer 元件
import TopButton from "@/components/TopButton.vue"; //引入 TopButton 元件
import { useCartStore } from "@/stores/cartStore"; // 引入Store 

const selectedCategory = ref(""); // 分類篩選
const selectedSort = ref("price"); // 排序依據預設為價格
const selectedOrder = ref("ASC"); // 排序方式
const products = ref([]); // 商品列表
const page = ref(1); // 當前頁數
const pageSize = ref(6); // 每頁商品數
const totalPages = ref(0); // 總頁數
const search = ref("");
const cartStore = useCartStore(); //加入購物車

//加入購物車
const addToCart = (product) => {
  console.log('點擊加入購物車，傳入的商品:', product);
  console.log('點擊加入購物車，商品 ID:', product.productId);
  cartStore.addItem(product); // 這裡會呼叫 cartStore 的 addItem
};
// 搜尋
const searchBtn = () => {
  page.value = 1; // 搜尋時重置頁數為 1
  fetchProducts(); // 重新載入商品資料
};
// 當分類篩選變更時，將頁數重置為 1 並重新獲取商品
const onCategoryChange = () => {
  page.value = 1; // 當分類變更時，跳回第一頁
  fetchProducts(); // 重新發送請求來獲取資料
};

// 從後端獲取商品資料
const fetchProducts = () => {
  const params = {
    category: selectedCategory.value || undefined,
    sort: selectedSort.value || "created_date", // 排序依據
    order: selectedOrder.value || "ASC", // 排序方式
    pageNum: page.value,
    pageSize: pageSize.value,
    search: search.value || undefined
  };
 

  axios
    .get("http://localhost:8080/api/products/getAllProducts", { params }) // 串接原本的 API
    .then((response) => {
      products.value = response.data.list; // 更新商品列表
      totalPages.value = response.data.pages; // 更新總頁數
    })
    .catch((error) => {
      console.error("無法獲取商品資料:", error);
    });
};

const changePage = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchProducts();
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.page-container {
  margin: 50px 0;
}
/* 分類篩選和排序 */
.sort-options {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  
}
.sort-center {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  
}
.sort-item {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.sort-item label {
  margin-bottom: 10px;
  
}
/* 搜尋欄位 */
.search-box{
  display: flex;
  align-items: center;
  justify-content: center;
  gap:20px;
  font-size:20px;

}

.searchBtn{
  border: none;
  width:150px;
  padding:12px;
  border-radius: 5px;
  font-size: 16px;
  background-color: lightgray;
  
}

.searchBtn:hover{
  background-color:rgb(200, 200, 200, 0.5);
  
}

/* 商品容器 */
.product-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每排 3 個產品 */
  gap: 20px; /* 產品間距 */
  max-width: 1200px; /* 限制最大寬度 */
  width: 100%;
  justify-items: center; /* 水平置中 */
}

/* 商品卡片 */
.product-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  text-decoration: none; /* 移除底線 */
}


.product-card:hover {
  transform: translateY(-5px);
}

/* 商品圖片 */
.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
}

/* 商品詳情 */
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  margin: 10px 0;
  font-size: 16px;
  color:slategray;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  font-size: 14px;
  color:orangered;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-category {
  font-size: 14px;
  color: #888;
  margin: 5px 0;
}

/* 商品描述 */
.product-description {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
}

/* 加入購物車按鈕 */
.add-to-cart {
  background-color: #7b5e36;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
  margin-bottom: 10px;
}

.add-to-cart:hover {
  background-color: #a07b47;
}

/* 分頁功能 */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  
}
.pagination button{
  border-radius: 10%;
  font-size: 16px;
  padding: 8px;
  border: 2px solid hsl(210, 50%, 85%);
  cursor: pointer;
}

.pagination button:hover{
  border: 2px solid hsl(210, 85%, 75%);
  
}
</style>


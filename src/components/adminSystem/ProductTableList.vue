<template>
  <div class="container">
    <div class="tableContainer">
      <div class="titlecontainer">
        <div class="title">商品管理列表</div>
      </div>
      <div class="search">
        <input class="searchInput" type="text" v-model="searchQuery" placeholder="搜尋產品名稱" />
      </div>
      <div class="addbtn" @click="openAddModal">新增產品</div>
      <table class="table">
        <thead>
          <tr>
            <th class="productName">商品名稱</th>
            <th class="category">分類</th>
            <th class="model">型號</th>
            <th class="price">價格</th>
            <th class="stock">庫存</th>
            <th class="function">新增日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in displayedProductData" :key="index">
            <td class="productName">{{ product.name }}</td>
            <td class="category">{{ product.category }}</td>
            <td class="model">{{ product.model }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <div class="button">
                <button class="btn" @click="openEditModal(product)">編輯</button>
                <button class="btn" @click="deleteProduct(product)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button class="paginationButton" @click="handlePrevPage" :disabled="currentPage === 1">
          上一頁
        </button>
        <span class="paginationText">
          第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁
        </span>
        <button class="paginationButton" @click="handleNextPage" :disabled="currentPage === totalPages">
          下一頁
        </button>
      </div>
    </div>
    <EditProductModal :show="isEditModalVisible" :product="selectedProduct" @close="closeModal"
      @save="updateProduct" />
    <AddProductModal :show="isAddModalVisible" :product="selectedProduct" @close="closeModal"
      @save="addProduct" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EditProductModal from './EditProductModal.vue';
import AddProductModal from './AddProductModal.vue';

// 產品資料
const products = ref([
  { productId: 1, name: 'iPad Air', category: 'PAD', model: 'APPLE', price: 18900, stock: 10 },
  { productId: 2, name: 'Galaxy Tab S8', category: 'PAD', model: 'SAMSUNG', price: 20900, stock: 8 },
  { productId: 3, name: 'iPhone 15', category: 'PHONE', model: 'APPLE', price: 32900, stock: 5 },
  { productId: 4, name: 'Xperia 5', category: 'PHONE', model: 'SONY', price: 24900, stock: 7 },
  { productId: 5, name: 'ZenPad', category: 'PAD', model: 'ASUS', price: 15900, stock: 4 },
  { productId: 6, name: 'Realme C55', category: 'PHONE', model: 'REALME', price: 8990, stock: 12 },
  { productId: 7, name: 'iPad Air', category: 'PAD', model: 'APPLE', price: 18900, stock: 10 },
  { productId: 8, name: 'Galaxy Tab S8', category: 'PAD', model: 'SAMSUNG', price: 20900, stock: 8 },
  { productId: 9, name: 'iPhone 15', category: 'PHONE', model: 'APPLE', price: 32900, stock: 5 },
  { productId: 10, name: 'Xperia 5', category: 'PHONE', model: 'SONY', price: 24900, stock: 7 },
  { productId: 11, name: 'ZenPad', category: 'PAD', model: 'ASUS', price: 15900, stock: 4 },
  { productId: 12, name: 'Realme C55', category: 'PHONE', model: 'REALME', price: 8990, stock: 12 },
  { productId: 13, name: 'iPad Air', category: 'PAD', model: 'APPLE', price: 18900, stock: 10 },
  { productId: 14, name: 'Galaxy Tab S8', category: 'PAD', model: 'SAMSUNG', price: 20900, stock: 8 },
  { productId: 15, name: 'iPhone 15', category: 'PHONE', model: 'APPLE', price: 32900, stock: 5 },
  { productId: 16, name: 'Xperia 5', category: 'PHONE', model: 'SONY', price: 24900, stock: 7 },
  { productId: 17, name: 'ZenPad', category: 'PAD', model: 'ASUS', price: 15900, stock: 4 },
  { productId: 18, name: 'Realme C55', category: 'PHONE', model: 'REALME', price: 8990, stock: 12 },
  { productId: 19, name: 'POCO X5', category: 'PHONE', model: 'POCO', price: 10900, stock: 9 }
]);

// 分頁設定
const currentPage = ref(1);
const itemsPerPage = 10;

// 計算屬性
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));
const displayedProductData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(startIndex, startIndex + itemsPerPage);
});

// 分頁功能
const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 刪除產品
const deleteProduct = (product) => {
  products.value = products.value.filter((p) => p !== product);
};

// 模態框狀態
const isEditModalVisible = ref(false);
const isAddModalVisible = ref(false);
const selectedProduct = ref(null);

// 開啟模態框
const openEditModal = (product) => {
  selectedProduct.value = { ...product }; // 避免直接修改原始資料
  isEditModalVisible.value = true;
};

const openAddModal = () => {
  selectedProduct.value = {
    name: '',
    category: '',
    model: '',
    price: 0,
    stock: 0,
  }; // 初始化表單
  isEditModalVisible.value = true;
  isAddModalVisible.value = true;
};

// 關閉模態框
const closeModal = () => {
  isEditModalVisible.value = false;
  isAddModalVisible.value = false;
};

// 更新產品資料
const updateProduct = (updatedProduct) => {
  const index = products.value.findIndex((p) => p.productId === updatedProduct.productId);
  if (index > -1) {
    products.value[index] = updatedProduct;
  }
  closeModal();
};

// 新增產品資料
const addProduct = (newProduct) => {
  const newProductId = Math.max(...products.value.map((p) => p.productId)) + 1; // 自動生成唯一 ID
  products.value.push({ ...newProduct, productId: newProductId });
};
</script>


<style scoped>
.container {
  margin: 20px auto;
}

.titlecontainer {
  display: flex;
  justify-content: center;
}

.addbtn {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 10px;
  background-color:lightgray;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addbtn:hover {
  background-color: orange;
}


.tableContainer {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.table {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  border-collapse: collapse;
  text-align: center;
  border: darkgray solid 2px;
}

.table th,
.table td {
  vertical-align: middle;
  border: darkgray solid 2px;
  background-color: white;
  padding: 4px;
}

.table thead th {
  background-color: lightgray;
  font-weight: bold;
}

.button {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn {
  padding: 10px;
  margin: 0 4px 0 4px;
  background-color: lightgray;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  border:none;
}

.btn:hover {
  background-color: rgb(255, 165, 0, 0.7);
}

.pagination {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.paginationButton {
  padding: 8px 12px;
  margin: 0px 12px 0px 12px;
  cursor: pointer;
  background-color: lightgray;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  border:none;
}

.paginationButton:hover {
  background-color: rgb(255, 165, 0, 0.7);
}

.title {
  position: relative;
  bottom: 32px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.search {
  position: relative;
  display: flex;
  justify-content: center;
  bottom: 20px;
}

.searchInput {
  width: 200px;
  padding: 4px;
  border: gray solid 1px;
  border-radius: 4px;
  font-size: 14px;
}

.productName {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category {
  min-width: 80px;
}

.model {
  min-width: 100px;
}

.price {
  min-width: 80px;
}

.stock {
  min-width: 80px;
}

.function {
  min-width: 120px;
}

@media screen and (max-width: 1200px) {
  .function {
    min-width: 120px;
  }

  .stock {
    min-width: 80px;
  }
}

@media screen and (max-width: 992px) {
  .productName {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .container {
    margin: 100px auto;
    height: auto;
  }

  .table {
    width: 325px;
  }

  .table th,
  .table td {
    padding: 2px;
    font-size: 12px;
  }

  .category {
    width: 60px;
    min-width: 60px;
  }

  .model {
    width: 60px;
    min-width: 60px;
  }

  .price {
    max-width: 60px;
    width: 60px;
    min-width: 60px;
  }

  .stock {
    max-width: 60px;
    width: 60px;
    min-width: 60px;
  }

  .function {
    min-width: 90px;
  }

  .paginationButton {
    padding: 4px 8px;
    margin: 0px 8px 0px 8px;
    font-size: 12px;
  }

  .paginationText {
    font-size: 12px;
  }

  .tableContainer {
    margin-top: 0;
  }
}
</style>

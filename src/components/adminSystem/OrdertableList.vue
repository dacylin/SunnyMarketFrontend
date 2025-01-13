<!-- 這是給後台人員 看的 所有使用者 訂單列表
     OrdertableList.vue 
-->
<template>
  <div class="container">
    <div class="tableContainer">
      <div class="title">會員訂單總表</div>
      <div class="search">
        <input class="searchInput" type="text" v-model="search" placeholder="搜尋使用者名稱" @input="handleSearch" />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>會員編號</th>
            <th>訂單編號</th>
            <th>建立日期</th>
            <th>總金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in displayOrders" :key="index">
            <td>{{ order.userId }}</td>
            <td>{{ order.orderId }}</td>
            <td>{{ order.createdDate }}</td>
            <td>{{ order.totalAmount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button class="paginationButton" @click="handlePrevPage" :disabled="pageNum === 1">
          上一頁
        </button>
        <span class="paginationText">
          第 {{ pageNum }} 頁 / 共 {{ totalPages }} 頁
        </span>
        <button class="paginationButton" @click="handleNextPage" :disabled="pageNum === totalPages">
          下一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios";
import TokenStore from "@/utils/TokenStore";// 引用 TokenStore

// 預設用戶 ID Brian（測試用，要記得改掉）
const userId = 2;

// 儲存訂單資料
const orders = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const totalPages = ref();
const search = ref('');

// 請求後端API
const fetchOrders = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    search: search.value,
  }
  try {
    // 取得存儲在 localStorage 中的 token
    const token = TokenStore.getToken();

    // 設定 Axios 請求的 headers
    if (token) {
      const response = await axios.get(
        `http://localhost:8080/orders/getAllOrders`, // 修改為你的 API 路徑
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`, // 加入 JWT token
          },
        }
      );
      console.log("response.data回傳為", response)
      orders.value = response.data.list; // 設置訂單列表
      totalPages.value = Math.ceil(response.data.total / pageSize.value);
    } else {
      console.error("未獲取到 token，無法進行請求");
    }
  } catch (error) {
    console.error('fetching orders方法錯誤:', error);
  }
};
// 初始化時調用 API
onMounted(() => {
  fetchOrders();
});

const handlePrevPage = () => {
  if (pageNum.value > 1) {
    pageNum.value--;
    fetchOrders();
  }
};

const handleNextPage = () => {
  if (pageNum.value < totalPages.value) {
    pageNum.value++;
    fetchOrders();
  }
};

const handleSearch = () => {
  pageNum.value = 1;
  fetchOrders();
}

// 計算補足的空白行
const displayOrders = computed(() => {
  const emptyRows = 10 - orders.value.length; // 確保顯示 10 行
  const placeholders = Array.from({ length: emptyRows }, () => ({
    userId: '',
    orderId: '',
    createdDate: '',
    totalAmount: '',
  }));
  return [...orders.value, ...placeholders];
});
</script>

<style scoped>
.container {
  margin: 20px auto;
}

.tableContainer {
  text-align: center;
}

.table {
  margin: 0 auto;
  width: 800px;
  border-collapse: collapse;
  text-align: center;
  border: 2px solid darkgray;
}

.table th,
.table td {
  border: 2px solid darkgray;
  padding: 4px;
  height: 44px;
}

.table thead th {
  background: lightgray;
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
  border: none;
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

  border-radius: 8px;
  transition: background-color 0.3s ease;
  background-color: lightgray;
  border: none;
}

.paginationButton:hover {
  background-color: orange;
}

.title {
  margin-bottom: 20px;
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

.role {
  min-width: 80px;
}

.status {
  max-width: 56px;
  width: 56px;
  min-width: 52px;
}

.function {
  min-width: 120px;
}

@media screen and (max-width: 1200px) {

  .function {
    min-width: 90px;
  }

  .paginationButton {
    padding: 8px 12px;
    margin: 0px 8px 0px 8px;
    font-size: 12px;
    cursor: pointer;
    background-color: lightgray;
    border: none;
  }

  .paginationText {
    font-size: 12px;
  }

  .tableContainer {
    margin-top: 0;
  }

}
</style>
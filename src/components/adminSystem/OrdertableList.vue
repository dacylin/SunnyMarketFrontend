<!-- 這是給後台人員 看的 所有使用者 訂單列表
     OrdertableList.vue 
-->
<template>
    <div class="container">
      <div class="tableContainer">
        <div class="title">會員訂單總表</div>
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
            <tr v-for="order in orders" :key="order.order_id">
              <td>{{ order.userId  }}</td>
              <td>{{ order.orderId  }}</td>
              <td>{{ order.createdDate  }}</td>
              <td>{{ order.totalAmount  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import TokenStore from "@/utils/TokenStore";// 引用 TokenStore
  
  // 預設用戶 ID Brian（測試用，要記得改掉）
  const userId = 2;
  
  // 儲存訂單資料
  const orders = ref([]);
  
  // 請求後端API
  const fetchOrders = async () => {
    try {
      // 取得存儲在 localStorage 中的 token
      const token = TokenStore.getToken();
  
      // 設定 Axios 請求的 headers
      if (token) {
        const response = await axios.get(
          `http://localhost:8080/orders/${userId}/getAllOrders`, // 修改為你的 API 路徑
          {
            headers: {
              Authorization: `Bearer ${token}`,  // 加入 JWT token
            }
          }
        );
  
        console.log("response.data回傳為", JSON.stringify(response.data, null, 2));
        orders.value = response.data.list; // 設置訂單列表
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
  }
  
  .table thead th {
    background: lightgray;
    font-weight: bold;
  }
  
  .title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .role {
    min-width: 80px;
  }
  </style>
  
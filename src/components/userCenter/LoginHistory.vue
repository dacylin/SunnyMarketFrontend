<!-- loginhistory.vue -->
<template>
  <div class="login-history">
    <h2>登入歷史查詢</h2>
    <table v-if="loginRecordsPaginated.length > 0">
      <thead>
        <tr>
          <th>Record Id</th>
          <th>Login Time</th>
          <th>IP 地址</th>
          <th>OS 名稱</th>
          <th>瀏覽器</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in loginRecordsPaginated" :key="record.recordId">
          <td>{{ record.recordId }}</td>
          <td>{{ record.loginTime }}</td>
          <td>{{ record.ipAddress }}</td>
          <td>{{ record.osName }}</td>
          <td>{{ record.browser }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No login records found.</p>

    <!-- Pagination Controls -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import TokenStore from "@/utils/TokenStore";

const loginRecords = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const userId = localStorage.getItem("userId"); // 從 TokenStore 或 localStorage 中獲取 userId

onMounted(async () => {
  const token = TokenStore.getToken();

  if (!token) {
    console.error("No token found. Unable to fetch login records.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/user/loginRecord/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // 將 token 添加到 Authorization header
      }
    });
    loginRecords.value = response.data;
    console.log("Login records fetched successfully:", loginRecords.value);
  } catch (error) {
    console.error('Failed to fetch login records:', error);
  }
});

const totalPages = computed(() => Math.ceil(loginRecords.value.length / itemsPerPage));
const loginRecordsPaginated = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return loginRecords.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.login-history {
  margin: 20px auto;
  max-width: 800px;
  text-align: center;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  
}

table {
  width:  700px;
  border-collapse: collapse;
  margin-top: 10px;
}

thead {
  background: rgb(255, 255, 100, 0.7);
 
}

th, td {
  border: 2px solid lightgray;
  padding: 10px;
  text-align: center;
}

th {
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 5px;
}

button:hover:not([disabled]) {
  background-color: #ddd;
}

button:disabled {
  background-color: #f4f4f4;
  cursor: not-allowed;
}
</style>

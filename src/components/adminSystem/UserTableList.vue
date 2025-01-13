<template>
  <div class="container">
    <div class="tableContainer">
      <div class="title">使用者管理列表</div>
      <div class="search">
        <input class="searchInput" type="text" v-model="search" placeholder="搜尋使用者名稱" @input="handleSearch" />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="username">使用者名稱</th>
            <th class="email">使用者信箱</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in displayUsers" :key="index">
            <td class="username">{{ user.username }}</td>
            <td class="email">{{ user.email }}</td>
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
import axios from 'axios';

const users = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const totalPages = ref();

const search = ref('');

const getAllUser = () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    search: search.value,
  }

  axios
    .get(`http://localhost:8080/api/user/getAllUsers`, { params }) // 修正 URL 的 userId 拼接方式)
    .then((response) => {
      users.value = response.data.list;
      totalPages.value = Math.ceil(response.data.total / pageSize.value);
    })
    .catch((error) => {
      console.error("無法查詢使用者", error);
    });
};

onMounted(() => {
  getAllUser();
});


const handlePrevPage = () => {
  if (pageNum.value > 1) {
    pageNum.value--;
    getAllUser();
  }
};

const handleNextPage = () => {
  if (pageNum.value < totalPages.value) {
    pageNum.value++;
    getAllUser();
  }
};

const handleSearch = () => {
  pageNum.value = 1;
  getAllUser();
}

// 計算補足的空白行
const displayUsers = computed(() => {
  const emptyRows = 10 - users.value.length; // 確保顯示 10 行
  const placeholders = Array.from({ length: emptyRows }, () => ({
    username: '',
    email: '',
  }));
  return [...users.value, ...placeholders];
});
</script>


<style scoped>
.container {
  margin: 20px auto;
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

.addbtn {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px;
  background-color: gray;
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
  background-color: #fff;
  padding: 4px;
  height: 44px;
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

.username {
  min-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.email {
  width: 100%;
}

.role {
  min-width: 80px;
}

.status {
  min-width: 80px;
}

.function {
  min-width: 120px;
}

@media screen and (max-width: 1200px) {

  .function {
    min-width: 120px;
  }

  .status {
    min-width: 80px;
  }
}

@media screen and (max-width: 992px) {
  .username {
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

  .role {
    width: 44px;
    min-width: 44px;
  }

  .email {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status {
    max-width: 56px;
    width: 56px;
    min-width: 52px;
  }

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
<template>
  <div class="container">
    <div class="tableContainer">
      <div class="title">使用者管理列表</div>
      <div class="search">
        <input class="searchInput" type="text" v-model="searchQuery" placeholder="搜尋使用者名稱" />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="username">使用者名稱</th>
            <th class="email">使用者信箱</th>
            <th class="role">權限</th>
            <th class="status">狀態</th>
            <th class="function">功能</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in displayedUserData" :key="index">
            <td class="username">{{ user.username }}</td>
            <td class="email">{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.isDelete ? '已停用' : '啟用中' }}</td>
            <td>
              <div class="button">
                <button class="btn" @click="openModal(user)">編輯</button>
                <button class="btn" @click="toggleUserStatus(user)">
                  {{ user.isDelete ? '啟用' : '停用' }}
                </button>
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
    <EditUserModal :show="isModalVisible" :user="selectedUser" @close="closeModal" @save="updateUser" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EditUserModal from './EditUserModal.vue';

const users = ref([
  { userid: '1', username: 'user1', email: 'user1@example.com', role: 'ADMIN', isDelete: false },
  { userid: '2', username: 'user2', email: 'user2@example.com', role: 'USER', isDelete: false },
  { userid: '3', username: 'user3', email: 'user3@example.com', role: 'USER', isDelete: true },
  { userid: '4', username: 'user4', email: 'user4@example.com', role: 'ADMIN', isDelete: false },
  { userid: '5', username: 'user5', email: 'user5@example.com', role: 'USER', isDelete: true },
  { userid: '6', username: 'user6', email: 'user6@example.com', role: 'USER', isDelete: false },
  { userid: '7', username: 'user7', email: 'user7@example.com', role: 'ADMIN', isDelete: false },
  { userid: '8', username: 'user8', email: 'user8@example.com', role: 'USER', isDelete: true },
  { userid: '9', username: 'user9', email: 'user9@example.com', role: 'USER', isDelete: false },
  { userid: '10', username: 'user10', email: 'user1@example.com', role: 'ADMIN', isDelete: false },
  { userid: '11', username: 'user12', email: 'user2@example.com', role: 'USER', isDelete: false },
  { userid: '12', username: 'user13', email: 'user3@example.com', role: 'USER', isDelete: true },
  { userid: '13', username: 'user14', email: 'user4@example.com', role: 'ADMIN', isDelete: false },
  { userid: '14', username: 'user15', email: 'user5@example.com', role: 'USER', isDelete: true },
  { userid: '15', username: 'user16', email: 'user6@example.com', role: 'USER', isDelete: false },
  { userid: '16', username: 'user17', email: 'user7@example.com', role: 'ADMIN', isDelete: false },
  { userid: '17', username: 'user18', email: 'user8@example.com', role: 'USER', isDelete: true },
]);

const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const displayedUserData = computed(() => users.value.slice(startIndex.value, startIndex.value + itemsPerPage.value));

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

const toggleUserStatus = (user) => {
  user.isDelete = !user.isDelete;
};

const isModalVisible = ref(false);
const selectedUser = ref(null);

const openModal = (user) => {
  selectedUser.value = user;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const updateUser = (updatedUser) => {
  const index = users.value.findIndex((u) => u.userid === updatedUser.userid);
  if (index !== -1) {
    users.value[index] = updatedUser;
  }
  closeModal();
};
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

  border-radius: 8px;
  transition: background-color 0.3s ease;
  background-color: lightgray;
  border:none;
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
    border:none;
  }

  .paginationText {
    font-size: 12px;
  }

  .tableContainer {
    margin-top: 0;
  }

}
</style>

<!-- todo: 先只要顯示 -->
<template>
  <div class="container">
    <div class="tableContainer">
      <div class="title">修改會員資料</div>
      <table class="table">
        <thead>
          <tr>
            <th class="username">姓名</th>
            <th class="email">email</th>
            <th class="role">生日</th>
            <th class="status">手機</th>
            <th class="function">地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.username }}</td>
            <td class="username">{{ user.email }}</td>
            <td class="username">{{ user.birthday }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ user.address }}</td>
            <!-- <td>
              <div class="button">
                <button class="btn" @click="openModal(user)">編輯</button>
                <button class="btn" @click="toggleUserStatus(user)">
                  {{ user.address ? "啟用" : "停用" }}
                </button>
              </div> 
            </td>-->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const users = ref([
  {
    username: "王小名",
    email: "user1@example.com",
    birthday: "1990-01-01",
    phone_number: "0900123456",
    address: "台灣",
  },
]);
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
  background-color: gold;
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
  background-color: gold;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  border: none;
}

.btn:hover {
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

  .tableContainer {
    margin-top: 0;
  }
}
</style>

<!-- todo: 先只要顯示 -->
<template>
  <div class="container">
    <div class="tableContainer">
      <div class="title">登入歷史查詢</div>
      <table class="table">
        <thead>
          <tr>
            <th class="username">登入時間</th>
            <th class="role">瀏覽器</th>
            <th class="status">登入設備</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="username">{{ user.username }}</td>
            <td class="role">{{ user.role }}</td>
            <td class="role">{{ user.device }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const users = ref([
  {  username: '0106', role: 'google', device: 'phone' },
  {  username: '0107', role: 'fox', device: 'phone' },
  {  username: '0108', role: 'google', device: 'phone'},
  {  username: '0108', role: 'fox', device: 'phone' },
  {  username: '0108', role: 'fox', device: 'phone'},
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
  background-color: lightgray;
  font-weight: bold;
}

.button {
  display: flex;
  justify-content: center;
  gap: 8px;
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

.role {
  min-width: 80px;
}

@media screen and (max-width: 1200px) {

  .username {
    min-width: 120px;
  }

  .role {
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

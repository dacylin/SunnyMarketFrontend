<template>
  <div class="user-profile">
    <h1>用戶個人資料</h1>
    <table class="profile-table">
      <thead>
        <tr>
          <th>用戶名稱</th>
          <th>地址</th>
          <th>聯絡電話</th>
          <th>生日</th>
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ user.username }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ user.birthday }}</td>
          
        </tr>
      </tbody>
    </table>

    <button @click="isEditing = !isEditing">{{ isEditing ? '取消編輯' : '編輯資料' }}</button>

    <!-- 編輯用戶資料 -->
    <div v-if="isEditing" class="edit-form">
      <table class="profile-table">
        <thead>
          <tr>
            <th>用戶名稱</th>
            <th>地址</th>
            <th>聯絡電話</th>
            <th>生日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="editUser.username" placeholder="用戶名稱" /></td>
            <td><input v-model="editUser.phoneNumber" placeholder="電話號碼" /></td>
            <td><input v-model="editUser.address" placeholder="地址" /></td>
            <td><input type="date" v-model="editUser.birthday" /></td>
          </tr>
        </tbody>
      </table>
      <button @click="saveUserProfile">保存資料</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TokenStore from "@/utils/TokenStore";

const user = ref({
  username: '',
  email: '',
  phoneNumber: '',
  birthday: '',
  address: ''
});

const editUser = ref({ ...user.value }); // 用於編輯模式的資料
const isEditing = ref(false); // 控制是否進入編輯模式
const userId = localStorage.getItem("userId"); // 使用者 ID

onMounted(async () => {
  const token = TokenStore.getToken();

  if (!token) {
    console.error("No token found. Unable to fetch user profile.");
    return;
  }

  try {
    // 獲取用戶資料
    const response = await axios.get(`http://localhost:8080/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.value = response.data;
    editUser.value = { ...user.value }; // 初始化編輯資料
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
});

// 保存用戶資料
const saveUserProfile = async () => {
  const token = TokenStore.getToken();

  if (!token) {
    console.error("No token found. Unable to save user profile.");
    return;
  }

  try {
    await axios.post(`http://localhost:8080/api/user/updateUesr/${userId}`, editUser.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.value = { ...editUser.value }; // 更新用戶資料
    isEditing.value = false; // 退出編輯模式
  } catch (error) {
    console.error('Failed to update user profile:', error);
  }
};
</script>

<style scoped>
.user-profile {
  margin: 20px auto;
  max-width: 800px;
  text-align: center;
}

.profile-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

thead {
  background-color: #f4f4f4;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  font-weight: bold;
}

.edit-form {
  margin-top: 20px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not([disabled]) {
  background-color: #ddd;
}

button:disabled {
  background-color: #f4f4f4;
  cursor: not-allowed;
}
</style>








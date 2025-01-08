<template>
  <div class="container">
    <h1>User Profile</h1>
    <table class="profile-table">
      <thead>
        <tr>
          <th>電子郵件</th>
          <th>會員姓名</th>
          <th>會員地址</th>
          <th>會員電話號碼</th>
          <th>會員生日</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ userFields.email }}</td>
          <td>{{ userFields.username }}</td>
          <td>{{ userFields.address}}</td>
          <td>{{ userFields.phoneNumber }}</td>
          <td>{{ userFields.birthday }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import TokenStore from "@/utils/TokenStore"; 

const route = useRoute();
const userId = route.params.userId;

// 定義欄位
const userFields = {
  email: {label: 'email', type: 'text'},
  username: { label: 'Username', type: 'text' },
  address: { label: 'Address', type: 'text' },
  phoneNumber: { label: 'Phone Number', type: 'text' },
  birthday: { label: 'Birthday', type: 'date' },
};


const fetchUserProfile = async () => {
  try {
    const token = TokenStore.getToken(); // 從 TokenStore 獲取 Token
    const userId = localStorage.getItem('userId');

    const response = await axios.get(`/api/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 在請求中攜帶 Token
      },
    });
    console.log("API Response:", response.data); 
    Object.assign(editableUserProfile, response.data);

    for (const key in userFields) {
      isEditing[key] = false;
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    alert(`無法加載用戶資料，錯誤：${error.response?.status || "未知錯誤"}`);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: gray;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  width: 150px;
}

.value {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

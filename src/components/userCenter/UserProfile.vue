<!-- userprofile.vue -->

<template>
  <el-card class="user-profile-card" shadow="hover">
    <h2 class="title">修改會員資料</h2>
    <template v-if="!editMode">
      <div class="table-container">
        <el-table :data="userData" border>
          <el-table-column
            prop="label"
            label="項目"
            width="120"
          ></el-table-column>
          <el-table-column prop="value" label="資料"></el-table-column>
        </el-table>
      </div>

      <div class="actions">
        <el-button type="primary" @click="enterEditMode">點此更新</el-button>
      </div>
    </template>

    <template v-else>
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-width="100px"
      >
        <el-form-item label="使用者名稱" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>

        <el-form-item label="電話號碼" prop="phoneNumber">
          <el-input v-model="formData.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="選擇日期"
          ></el-date-picker>
        </el-form-item>

        <div class="actions">
          <el-button type="primary" @click="submitUpdate">確認修改</el-button>
          <el-button @click="cancelEditMode">取消</el-button>
        </div>

      </el-form>
    </template>
  </el-card>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "@/utils/Request"; // 使用封裝的 Axios 工具

// 靜態資料結構，表示使用者的四個資料項目
const userData = reactive([
  { label: "使用者名稱", value: "" },
  { label: "地址", value: "" },
  { label: "電話號碼", value: "" },
  { label: "生日", value: "" },
]);

const formData = reactive({
  username: "",
  address: "",
  phoneNumber: "",
  birthday: "",
});

// 是否進入編輯模式
const editMode = ref(false);

// 表單驗證規則
const rules = {
  username: [{ required: true, message: "請輸入使用者名稱", trigger: "blur" }],
  address: [{ required: true, message: "請輸入地址", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "請輸入電話號碼", trigger: "blur" },
    {
      pattern: /^[0-9]{8,15}$/,
      message: "電話號碼格式不正確",
      trigger: "blur",
    },
  ],
  birthday: [{ required: true, message: "請選擇生日", trigger: "change" }],
};

// 進入編輯模式的方法
const enterEditMode = () => {
  editMode.value = true;
  // 將靜態資料填充到表單中
  formData.username = userData[0].value;
  formData.address = userData[1].value;
  formData.phoneNumber = userData[2].value;
  formData.birthday = userData[3].value;
};

// 提交更新的方法
const submitUpdate = async () => {
  try {
    const userId = localStorage.getItem("userId");
    await axios.put(`/api/user/updateUser/${userId}`, formData);
    ElMessage.success("資料更新成功");
    editMode.value = false;
    await fetchUserData(); // 更新後重新載入資料
  } catch (error) {
    console.error("更新失敗:", error);
    ElMessage.error("更新失敗，請稍後再試");
  }
};

// 取消編輯模式
const cancelEditMode = () => {
  editMode.value = false;
};

// 載入使用者資料的方法
const fetchUserData = async () => {
  try {
    const userId = localStorage.getItem("userId"); // 從 localStorage 獲取 userId
    const response = await axios.get(`/api/user/profile/${userId}`); // 調用後端 API
    const { username, address, phoneNumber, birthday } = response.data;

    // 更新表格資料
    userData[0].value = username || "未提供";
    userData[1].value = address || "未提供";
    userData[2].value = phoneNumber || "未提供";
    userData[3].value = birthday || "未提供";
  } catch (error) {
    console.error("載入資料失敗:", error);
    ElMessage.error("無法獲取使用者資料");
  }
};

// 在組件掛載時載入資料
onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.user-profile-container {
    display: flex;
    padding: 20px; /* 外部間距 */
}

.user-profile-card {
    width: 700px; /* 固定寬度 */
    height: auto;
    padding: 20px; /* 內邊距 */
    border: 1px solid #dcdcdc; /* 邊框樣式 */
    border-radius: 8px; /* 圓角效果 */
    box-shadow: none; /* 去掉多餘陰影 */
    overflow: hidden; /* 防止內容溢出 */
    max-height: 400px; /* 限制最大高度 */
    margin:50px auto 0 auto;
}

.table-container {
    width: 100%;
    margin-top: 10px; /* 表格上移 */
}

.custom-table {
    width: 100%; /* 表格寬度佔滿卡片 */
    text-align: center; /* 表格文字居中 */
}

.title {
    font-size: 24px; /* 標題字體大小 */
    font-weight: bold; /* 標題加粗 */
    margin-bottom: 10px; /* 與表格間距 */
    text-align: center; /* 標題靠左對齊 */
}

.actions {
    margin-top: 20px;
    text-align: center; /* 按鈕居中 */
}

.actions button {
    margin:30px 50px;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) !important; /* 調整陰影大小和透明度 */
}

</style>
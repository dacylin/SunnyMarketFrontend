<template>
  <div class="modal" v-if="show">
    <div class="modalContent">
      <div class="title">編輯商品</div>
      <form @submit.prevent="handleSave" class="form">
        <label>商品名稱：</label>
        <input v-model="form.productName" required />

        <label>分類：</label>
        <select v-model="form.category" required>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <label>價格：</label>
        <input v-model.number="form.price" type="number" required />

        <label>庫存：</label>
        <input v-model.number="form.stock" type="number" required />

        <div class="actions">
          <button class="btn" type="submit">儲存</button>
          <button class="btn" type="button" @click="closeModal">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const categories = ['FOOD', 'SEAFOOD'];

// 接收父層傳入的屬性與事件
const props = defineProps({
  show: Boolean,
  product: Object
});
const emit = defineEmits(['close', 'save']);

// 表單資料的本地狀態
const form = ref({});

// 監聽 product 資料變動，確保表單同步
watch(
  () => props.product,
  (newValue) => {
    form.value = { ...newValue };
  },
  { immediate: true, deep: true }
);

const handleSave = async () => {
  try {
    // 透過 axios 發送 PUT 請求更新產品資料
    const data = await axios.put(
      `http://localhost:8080/api/products/admin/updateProduct/${props.product.productId}`, // 修正 URL 的 productId 拼接方式
      {
        productName: form.value.productName,
        category: form.value.category,
        price: form.value.price,
        stock: form.value.stock,
      }
    );

    // 通知父層更新資料
    emit('save', data.data);

    // 關閉彈窗
    closeModal();
  } catch (error) {
    console.error('更新產品資料失敗：', error);
  }
};

// 關閉模態框
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalContent {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
}

.form label {
  margin-top: 10px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
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
  background-color: orange;
}
</style>

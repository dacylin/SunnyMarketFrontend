<template>
  <div class="modal" v-if="show">
    <div class="modalContent">
      <div class="title">編輯使用者</div>
      <form @submit.prevent="handleSave" class="form">
        <label>使用者名稱：</label>
        <input v-model="form.username" required />

        <label>使用者信箱：</label>
        <input v-model="form.email" required />

        <label>權限：</label>
        <select v-model="form.role" required>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>

        <div class="actions">
          <button class="btn" type="submit">儲存</button>
          <button class="btn" type="button" @click="closeModal">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const roles = ['ADMIN', 'USER'];

// 接收父層傳入的屬性與事件
const props = defineProps({
  show: Boolean,
  user: Object
});
const emit = defineEmits(['close', 'save']);

// 表單資料的本地狀態
const form = ref({});

// 監聽 product 資料變動，確保表單同步
watch(
  () => props.user,
  (newValue) => {
    form.value = { ...newValue };
  },
  { immediate: true, deep: true }
);

// 儲存表單並通知父層更新資料
const handleSave = () => {
  emit('save', { ...form.value });
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
  border:none;
}

.btn:hover {
  background-color: orange;
}
</style>

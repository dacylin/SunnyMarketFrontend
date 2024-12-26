<template>
  <div class="numbtn">
    <button @click="decrease" class="quantity-btn">—</button>
    <span class="quantity">{{ modelValue }}</span>
    <button @click="increase" class="quantity-btn">＋</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

// 傳入的屬性與事件
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// 增加數量
const increase = () => {
  emit("update:modelValue", props.modelValue + 1);
};

// 減少數量
const decrease = () => {
  if (props.modelValue > 1) {
    emit("update:modelValue", props.modelValue - 1);
  }
};
</script>

<style scoped>
.numbtn {
  background-color: rgba(170, 170, 170, 0.1);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quantity-btn {
  background-color: lightgray; 
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  font-weight: bold;
}

.quantity-btn:hover {
 opacity: 0.7;
  
}
</style>

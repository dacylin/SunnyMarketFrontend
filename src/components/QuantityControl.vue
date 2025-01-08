<template>
  <div class="numbtn">
    <!-- 控制數量按鈕 -->
    <button @click="decrease" class="quantity-btn">—</button>
    <span class="quantity">{{ modelValue }}</span>
    <button @click="increase" class="quantity-btn">＋</button>
    <!-- 加入購物車按鈕 -->
    <button class="cartbtn" @click="addToCart">加入購物車</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { useCartStore } from "@/stores/cartStore";

// 接收父組件傳入的屬性與事件
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "add-to-cart"]);

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

// 加入購物車
const cartStore = useCartStore();
const addToCart = () => {
  cartStore.addToCart(product);
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

.cartbtn {
  background-color: darkorange;
  color: white;
  border: none;
  font-size: 1em;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.cartbtn:hover {
  background-color: rgb(255, 140, 0, 0.7);
}
</style>

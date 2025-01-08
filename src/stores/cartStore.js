import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: [], // 購物車商品列表
  }),
  getters: {
    totalQuantity(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0); // 計算購物車中商品的總數量
    },
    totalPrice(state) {
      return state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ); // 計算購物車中的總價
    },
  },
  actions: {
    addItem(product) {
      console.log("cartStore新增商品資料:", product); // 打印完整的 product 資料
      console.log("cartStore資料商品 ID:", product.productId); // 打印 productId
      console.log("cartStore資料目前購物車內容:", this.items); // 打印目前的購物車內容
      const existingItem = this.items.find(
        (item) => item.id === product.productId
      ); // 檢查購物車中是否已經有這個商品
      if (existingItem) {
        existingItem.quantity += 1; // 如果商品已經在購物車中，數量加 1
      } else {
        this.items.push({ ...product, quantity: 1 }); // 如果商品不在購物車中，則將其加入，數量設為 1
        console.log("目前購物車內容:", this.items); // 查看整個購物車內容
      }
    },
    removeItem(productId) {
      console.log("移除商品 ID:", productId);
      console.log("移除前:", this.items);
      this.items = this.items.filter((item) => item.id !== productId);
      console.log("移除後:", this.items);
    },
    updateQuantity(productId, newQuantity) {
      const item = this.items.find((item) => item.id === productId); // 查找購物車中的商品
      if (item && newQuantity > 0) {
        item.quantity = newQuantity; // 更新商品數量，如果數量小於 1，則設為 1
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: [], // 購物車商品列表
    allSelected: false,
  }),
  getters: {
    totalQuantity(state) {
      return state.items
        .filter((item) => item.selected) // 選中商品
        .reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice(state) {
      return state.items
        .filter((item) => item.selected) // 選中商品
        .reduce((total, item) => total + item.quantity * item.price, 0);
    },
  },
  actions: {
  // 單選功能
  toggleItemSelection(productId) {
    const item = this.items.find((item) => item.productId === productId);
    if (item) {
      item.selected = !item.selected;
      this.allSelected = this.items.every((item) => item.selected);
    }
  },

  // 全選功能
  toggleAllSelection() {
    this.allSelected = !this.allSelected;
    this.items.forEach((item) => {
      item.selected = this.allSelected;
    });
  },
    addItem(product) {
      console.log("cartStore新增商品資料:", product); // 打印完整的 product 資料
      console.log("cartStore this.items 還沒推送內容:", JSON.stringify(this.items)); // 還沒推送，應該要是空
      const existingItem = this.items.find(
        (item) => item.productId === product.productId
      ); // 檢查購物車中是否已經有這個商品
      if (existingItem) {
        existingItem.quantity += 1; // 如果商品已經在購物車中，數量加 1
      } else {
        this.items.push({ ...product, quantity: 1, selected: true }); // 如果商品不在購物車中，則將其加入，數量設為 1
        console.log("cartStore 已push內容:", JSON.stringify(this.items)); // 還沒推送，應該要是空
      }
      // 更新全選狀態
      this.allSelected = this.items.every((item) => item.selected);
    },
    removeItem(productId) {
      console.log("cartStore移除商品 ID:", productId);
      console.log("cartStore 移除 this.items:", JSON.stringify(this.items));
      this.items = this.items.filter((item) => item.productId !== productId);
      console.log("cartStore移除後:", JSON.stringify(this.items));
    },
    updateQuantity(productId, newQuantity) {
      const item = this.items.find((item) => item.productId === productId); // 查找購物車中的商品
      if (item && newQuantity > 0) {
        item.quantity = newQuantity; // 更新商品數量，如果數量小於 1，則設為 1

      }
    },
    setDefaultQuantity(item) {
      if (!item.quantity || item.quantity === null || item.quantity === undefined || item.quantity <= 0 || item.quantity.replace ||!Number.isInteger(Number(item.quantity))) {

        item.quantity = 1; // 重設為 1
        console.warn(`數量為空，已重設為 1 (商品 ID: ${item.productId})`);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});
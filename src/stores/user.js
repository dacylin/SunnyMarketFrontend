import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref({
    name: "吉伊卡哇",
    phone: "123456789",
    email: "chiikawa@test.com",
  });

  function isLoggedIn() {
   
    return userData.value == null;
  }

  return {
    userData,
    isLoggedIn
  };
});


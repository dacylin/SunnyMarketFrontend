import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref(localStorage.getItem('token') || '') // 初始化時從 Local Storage 讀取

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    // 監控 token 值的變化並同步到 Local Storage
    watch(
      token,
      (newToken) => {
        if (newToken) {
          localStorage.setItem('token', newToken)
        } else {
          localStorage.removeItem('token')
        }
      },
      { immediate: true }
    )

    return { token, setToken, removeToken }
  },
  { persist: true } // 可選：如果使用 Pinia 的 persist 插件，也可以保持此設置
)

export default useTokenStore

<template>
  <Header />
  <div class="chatroom-container">
    <div v-if="isLoggedIn" class="chat-wrapper">
      <div class="chat-box">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.isUser ? 'user-message' : 'bot-message']"
        >
          {{ msg.text }}
        </div>
      </div>
      <div class="input-area">
        <input
          v-model="userAsk"
          @keyup.enter.stop="sendMessage"
          class="chat-input"
          placeholder="輸入訊息"
        />
        <button class="send-btn" @click="sendMessage">發送</button>
      </div>
    </div>
    <div v-else class="pleaseLogin">
      <p>請先登入以使用聊天室功能。</p>
    </div>
  </div>
  <Footer />
  <TopButton />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import TopButton from "@/components/TopButton.vue";

// 定義響應式變數
const userAsk = ref(""); // 輸入訊息
const messages = ref([]); // 儲存聊天訊息的陣列

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const isLoggedIn = !!token;

// 定義發送訊息的函式
const sendMessage = async () => {
  if (userAsk.value.trim() === "") return;

  // 先顯示用戶輸入的訊息
  messages.value.push({ text: userAsk.value, isUser: true });
  const currentUserAsk = userAsk.value; // 暫存用戶訊息
  userAsk.value = ""; // 清空輸入框

  try {
    // 發送訊息到後端
    const response = await axios.post(`/api/openAi/${userId}/chet`, {
      userAsk: currentUserAsk,
    });
    console.log(currentUserAsk);
    console.log(response);

    // 顯示伺服器回應的訊息
    messages.value.push({ text: response.data.aiRespond, isUser: false });
  } catch (error) {
    console.error("發送訊息失敗", error);
    messages.value.push({ text: "伺服器無法處理您的請求，請稍後再試。", isUser: false });
  }
};
</script>

<style>
.chatroom-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: calc(100vh - 200px);
}

.chat-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #343a40;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.chat-wrapper {
  width: 100%;
  max-width: 800px;
}

.chat-box {
  border-radius: 10px;
  background-color: #ffffff;
  height: 300px;
  overflow-y: auto;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ced4da;
}

.message {
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 50%;
  word-wrap: break-word;
}

.user-message {
  align-self: flex-end;
  background: linear-gradient(135deg, #63b4ff, #4a90e2);
  color: white;
  text-align: right;
  margin-left: auto;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
}

.bot-message {
  align-self: flex-start;
  background: #f1f3f5;
  color: #495057;
  text-align: left;
  margin-right: auto;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
}

.input-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 1rem;
}

.chat-input:focus {
  border-color: #63b4ff;
  box-shadow: 0 0 8px rgba(99, 180, 255, 0.5);
}

.send-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #63b4ff, #4a90e2);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: linear-gradient(135deg, #4a90e2, #3b78d4);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
}

.pleaseLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px); /* 動態計算高度，確保不重疊 Header 和 Footer */
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
  color: #495057;
  font-size: 1.2rem;
  line-height: 1.5;
}
</style>

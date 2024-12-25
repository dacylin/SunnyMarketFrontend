<!-- 側邊欄抽屜 -->
<template>
  <div class="sidebar">
    <a class="menu">
      <!-- 加入menu svg檔案 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </a>
    <!-- 帶出所有title -->
    <ul class="titles">
        <li v-for="title in titles" :key="title.id">{{ title.text }}</li>
    </ul>
  </div>
</template>

<script setup>
const titles = [
  { id: 1, text: "第一欄位" },
  { id: 2, text: "第二欄位" },
  { id: 3, text: "第三欄位" },
];
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 5%;
  min-height: 100vh;
  padding: 70px;
  background-color: yellow;
  justify-content: space-between;
  align-items: center;
  transition: 1s;
  z-index: 2000;
}

.menu {
  font-size: 2em;
  color: black;
  transition: ease 1s;
  z-index: 2000;
}
.menu.active {
  transform: rotateZ("180deg");
}
</style>

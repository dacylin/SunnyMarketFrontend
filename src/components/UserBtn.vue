<!-- header 的 登入按鈕 
     有一個svg
-->

<template>
  <div class="userbtn">
    <!-- 還沒設路由，先註解掉 
     <routerlink to="/user" class="user">
    -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="usersvg"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>
    <!-- 還沒設路由，先註解掉 
    </routerlink>-->
  </div>
</template>

<script setup></script>

<style scoped>
.userbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}


.usersvg {
  fill: grey; /*控制 svg檔案 顏色 */
  width: 2em;
  height: 2em;
  cursor: pointer;
}
.usersvg:hover {
  fill: orange;
}
</style>

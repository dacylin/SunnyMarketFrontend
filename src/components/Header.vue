<!-- nav參考樂田、加到最上頁按鈕、購物車參考哈肯鋪drawer -->

<script setup>

</script>

<template>
  <nav class="top-nav">
    <div class="logo">
      <img src="https://images.plurk.com/4EXN191BOki6RBVau6czWE.png" alt="Sunny Market Logo">
    </div>
    <ul>
      <!-- 線上商城 /online-shop -->
      <li class="btn"><a href="#" class="navitem">線上商城</a></li>

      <!-- 常見問題 /question-->
      <li class="btn"><a href="#" class="navitem">常見問題</a></li>

      <!-- 關於我們 /about-us-->
      <li class="btn"><a href="#" class="navitem">關於我們</a></li>

      <!-- 動態顯示登入或登出 -->
       <div v-if="isLoggedIn">
        <li class="btn"><a href="#" class="navitem" @click="logout">登出</a></li>
        <li class="btn"><a href="#" class="navitem" @click="mypage">會員中心</a></li>
      </div>
      <div v-else>
        <li class="btn"><a href="#" class="navitem" @click="login">登入</a></li>
        <li class="btn"><a href="#" class="navitem" @click="register">註冊</a></li>
      </div>

      <!-- 購物車 /cart-->
      <li class="btn"><a href="#" class="navitem">購物車</a></li>
    </ul>
  </nav>
  <h1>gogo</h1><h1>gogo</h1>
  <h1>gogo</h1><h1>gogo</h1>
  <h1>gogo</h1><h1>gogo</h1>
  <h1>gogo</h1><h1>gogo</h1>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=HK+Grotesk&display=swap');

h1 {
  font-size: 5em; /* 或者其他你想要的大小 */
  color:lightgrey;
}

.logo img {
  max-height: 70px; /* 設置圖片最大高度 */
  margin-left: 50px; /* 調整logo與ul之間的距離 */
  margin-top: 5px;
}

.top-nav {
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(150, 150, 150, 0.3); /* 下陰影 */
  border-bottom: 2px solid rgba(150, 150, 150, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  height:100px;
}

.btn .navitem {
  font-size: 1em;
  font-family: 'HK Grotesk', sans-serif; /*改成全域*/
  font-weight: bold;
  padding: 0.5em;
  position: relative;
  cursor: pointer;
  color: grey;
}

.btn .navitem:after {
  content: '';
  background-color: #FF8000; /*橘色*/
  position: absolute;
  bottom: -5px;
  height: 3px;
  width: 100%;
  left: 0;
  right: 0;
  transition: all cubic-bezier(0, 0.95, 0.55, 0.95) 1s;
  opacity: 0;
}

.btn .navitem:hover:after {
  bottom: 0;
  opacity: 0.75;
  transition: all cubic-bezier(0, 0.9, 0.6, 0.9) 1s;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin-right: 5%;
}

li {
  display: inline;
}
a {
text-decoration: none;
}
/*a {
  color: grey;
  font-size: 1em;
  text-decoration: none;
  padding: 10px 10px;
  background-color: transparent;
  transition: background-color 0.3s;
  font-weight: bold;
  font-family: 'HK Grotesk', sans-serif;*/
  /* 使用 HK Grotesk 字體
}*/
</style>

<!-- 到頂端按鈕 -->

<template>
  <div class="topbtn" @click="scrollTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="topsvg"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ScrollTopBtn",
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
.topbtn {
  position: fixed;
  right: 3em;
  bottom: 3em;
  border-radius: 50%; 
  cursor: pointer;
  display: flex; /* 讓內容居中 */
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(100, 100, 100, 0.5);
  
}

.topsvg {
  width:  3em; /* 設置大小 */
  height:  3em; /* 設置大小 */
  fill: orange;
  z-index: 900;
 
}

.topsvg :hover {
  fill: rgb(255, 165, 0, 0.7);
}

.scroll-top svg {
  display: block;
}
</style>
